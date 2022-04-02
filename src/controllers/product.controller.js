const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const authenticate = require("../middlewear/authenticate");
const Product = require("../models/productSchema");
//products crud
 router.post("/",authenticate,async (req,res) =>{
    req.body.user_id = req.userID;
    try {
        
        const product = await Product.create(req.body);
       
        
        res.send(product);    
    } catch (error) {
        res.send({message : error.message});
    } 
 });

router.get("/", async (req,res) => {
    try {
        const products = await Product.find().lean().exec();
        res.send(products);
    } catch (error) {
        res.send(error.message);
    }
})



module.exports = router