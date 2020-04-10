const express=require('express');
const router=new express.Router();
const auth=require('../middleware/auth');
const userModel=require('../model/user');

router.post('/signup', async (req, res)=>{
    try {
        console.log("Signup");
        console.log(req.body);
        const user=new userModel(req.body);
        await user.save();
        const token=await user.GenerateToken();
        res.status(201).send({
            success:true,
            msg:'User created!',
            token
        });
    } catch (error) {
        res.status(400).send({
            success:false,
            msg:'User already exists!',
            error
        })
    }
})

router.post('/login', async (req, res)=>{
    try {
        console.log(req.body);
        const loginUser = await userModel.loginUser(req.body.email, req.body.password);
        // console.log(loginUser);
         const token=await loginUser.GenerateToken();
            res.status(200).send({
            success:true,
            msg:'User logged in!',
            token
        });
    } catch (error) {
        res.status(400).send({
            success:false,
            msg:'User not found!',
            error
        })
        console.log(error);
    }
})

router.post('/logout', auth, async(req, res)=>{
    try {
        const user=req.user;
        console.log(user.tokens);
        console.log(req.token);
        user.tokens=user.tokens.filter(token=>token.token!=req.token);
        console.log(user.tokens);
        await user.save();
            res.status(200).send({
            success:true,
            msg:'User Logged out!',
        });
    } catch (error) {
        res.status(400).send({
            success:false,
            msg:'error in logging out user!',
            error
        })
    }
})

router.get('/users', async (req, res)=>{
    try {
        let users=await userModel.find();
        users=users.map(user=>{
            return {
                username:user.username
            }
        })
        console.log(users);
        res.status(200).send({
            success:true,
            data:users
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success:false,
            msg:'Unable to get users!'
        });
    }
})

router.post('/deleteuser', async (req, res)=>{
    try {
        console.log(req.body)
        const user =await userModel.findOneAndDelete({
            username:req.body.username
        });
        res.status(200).send({
            success:true,
            msg:'User deleted!'
        });
    } catch (error) {
        res.status(400).send({
            success:false,
            msg:'Unable to delete user!'
        });
    }
})

module.exports=router;