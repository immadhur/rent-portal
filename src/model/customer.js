const mongoose=require('mongoose');

const schema=mongoose.Schema({
    customer_id:String,
    customer_name:String
})

module.exports=mongoose.model('Customer', schema);