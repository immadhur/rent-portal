const jwt=require('jsonwebtoken');
const model=require('../model/user');
module.exports=async (req, res, next)=>{
    try {
        if(!req.headers.authorization)
            throw 'Auth failed!';
        const jwtToken=req.headers.authorization.replace('Bearer ', '');
        const {id}=jwt.verify(jwtToken, process.env.JWT_SECRET);
        const user=await model.findById(id)
        req.user=user;
        req.token=jwtToken;
        next()
    } catch (error) {
        console.log(error);
        res.status(501).send({
            success:false,
            msg:'Auth Failed',
            error
        });
    }
}