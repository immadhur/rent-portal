const mongoose=require('mongoose');

const schema=mongoose.Schema({
    transation_date_time:String,
    customer_id:String,
    product_id:String,
    transation_type:String,
    quantity:Number
})

module.exports=mongoose.model('Transaction', schema);