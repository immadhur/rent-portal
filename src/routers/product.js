const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const productModel = require('../model/product');

router.post('/product', auth, async (req, res) => {
    try {
        console.log(req.body);
        const product = new productModel({
            ...req.body,
        });
        await product.save();
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

router.get('/product',auth, async (req, res)=>{
    try {
        const products=await productModel.find();
        res.status(200).send({
            success:true,
            products
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            error
        })
    }
});

router.patch('/product/:id', auth, async (req, res)=>{
    try {
        await productModel.findOne({_id:req.params.id},(err, doc)=>{
            console.log(req.body);
            doc.qty_total=req.body.qty_total;
            doc.qty_booked=req.body.qty_booked;
            doc.save()
        } );
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

router.delete('/product/:id', auth, async (req, res)=>{
    try {
        const product=await productModel.findById({_id:req.params.id});
        if(!product)
            throw 'product not found!';
        await productModel.findByIdAndDelete({_id:req.params.id, owner:req.user._id});
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