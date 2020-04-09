const mongoose=require('mongoose');

const schema=mongoose.Schema({
    product_id:String,
    product_title:String,
    qty_total:Number,
    qty_booked:Number,
    price:Number
})

module.exports=mongoose.model('Product', schema);