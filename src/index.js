const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());



const connect = require("./config/db");

const productController = require("./controllers/product.controller");
const cartController = require("./controllers/cart.controlller");
// const userController = require("./src/routes/user.controller");

const {register,login} = require("./controllers/auth.controller");



app.post("/register", register)

app.post("/login", login)



// app.use("/users",userController);
app.use("/cart",cartController);
app.use("/products",productController);

 

 
 app.listen(5000, async()=>{
     try {
         await connect();
         console.log("listening on 5000")
     } catch (error) {
         console.log(error);
     }
 })
