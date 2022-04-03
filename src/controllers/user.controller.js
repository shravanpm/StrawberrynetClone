const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const user = require("../models/userSchema");

router.post("/",async (req,res) =>{
    
    try {
        console.log(req.body)
        const User = await user.create(req.body);
       
        
        res.send(User);    
    } catch (error) {
        res.send({message : error.message});
    } 
 });



module.exports = router