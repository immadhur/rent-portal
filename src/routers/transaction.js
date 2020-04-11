const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const transactionModel = require('../model/transaction');

router.post('/transaction', auth, async (req, res) => {
    try {
        console.log(req.body);
        const transaction = new transactionModel({
            ...req.body
        });
        await transaction.save();
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

router.get('/transaction',auth, async (req, res)=>{
    try {
        const transaction=await transactionModel.find();
        res.status(200).send({
            success:true,
            transaction
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            error
        })
    }
});

router.patch('/transaction/:id', auth, async (req, res)=>{
    try {
        const transaction=await transactionModel.findById(req.params.id);
        if(!transaction)
            throw 'transaction not found!';
        transaction.data=req.body.data;
        // await transactionModel.findOneAndUpdate({_id:req.params.id, owner:req.user._id});
        await transaction.save();
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

router.delete('/transaction/:id', auth, async (req, res)=>{
    try {
        const transaction=await transactionModel.findById({_id:req.params.id});
        if(!transaction)
            throw 'transaction not found!';
        await transactionModel.findByIdAndDelete({_id:req.params.id, owner:req.user._id});
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