const mongoose = require("mongoose");

const CartDataSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
    prodId:{type:mongoose.Schema.Types.ObjectId,ref:"product",required:true},
  
    quantity:{type:Number,default:1}
  },{
      timestamps : true,
      versionKey : false,
  })

module.exports = new mongoose.model("cart",CartDataSchema)