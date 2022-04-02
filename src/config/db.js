const express = require("express");
const mongoose = require("mongoose");

const connect = () =>{
    return mongoose.connect(
     "mongodb://127.0.0.1:27017/u4c4project"
    ); 
 };
 module.exports = connect