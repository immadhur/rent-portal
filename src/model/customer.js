const mongoose=require('mongoose');

const schema=mongoose.Schema({
    customer_name:{
        type: String,
        unique: true,
        trim:true
    }
})

module.exports=mongoose.model('Customer', schema);