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
        // const product=await productModel.findById(req.params.id);
        // if(!product)
            // throw 'product not found!';
        // product.data=req.body.data;
        await productModel.findOneAndUpdate({_id:req.params.id, ...req.body});
        console.log('product');
        // await product.save();
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