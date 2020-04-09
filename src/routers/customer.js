const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const customerModel = require('../model/customer');

router.post('/customer', auth, async (req, res) => {
    try {
        console.log(req.body);
        const customer = new customerModel({
            ...req.body
        });
        await customer.save();
        res.status(200).send({
            success: true
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            error
        })
    }
})

router.get('/customer',auth, async (req, res)=>{
    try {
        const customers=await customerModel.find();
        res.status(200).send({
            success:true,
            customers
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            error
        })
    }
});

router.patch('/customer/:id', auth, async (req, res)=>{
    try {
        const customer=await customerModel.findById(req.params.id);
        if(!customer)
            throw 'customer not found!';
        customer.data=req.body.data;
        // await customerModel.findOneAndUpdate({_id:req.params.id, owner:req.user._id});
        await customer.save();
        res.status(200).send({
            success:true
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            error
        })
    }
});

router.delete('/customer/:id', auth, async (req, res)=>{
    try {
        const customer=await customerModel.findById({_id:req.params.id});
        if(!customer)
            throw 'customer not found!';
        await customerModel.findByIdAndDelete({_id:req.params.id, owner:req.user._id});
        res.status(200).send({
            success:true
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            error
        })
    }
})

module.exports = router;