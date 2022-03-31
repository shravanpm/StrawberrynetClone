const express = require("express");
const Cart = require("../models/cart.model")

const router = express.Router();

router.get("/",  async (req, res) => {

    try {
      Cart.countDocuments({}).exec((err, count) => {
        if (err) {
            res.send(err);
            return;
        }
    
        res.send({ count: count });
    });
    } catch (err) {
      return res.status(400).send({ message: err.message });
    }
});


router.post("/" ,async (req, res) => {
    try{
        const cart = await Cart.create(req.body)
        return res.status(201).send(cart)
    }
    catch(err){
        return res.status(400).send("errr")
    }
 
})



module.exports = router;
