
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  prodId:{type:mongoose.Schema.Types.ObjectId,ref:"product",required:true,unique:true},
  quantity:{type:Number,default:1}
},{
    timestamps : true,
    versionKey : false,
})


const Cart = mongoose.model("cart", cartSchema)

module.exports = Cart;