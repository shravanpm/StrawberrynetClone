const express = require("express");
const userController = require("./controllers/user.controller")
const productController = require("./controllers/poduct.controller")
const cors = require("cors")
const {register,login } = require("./controllers/auth.controller")
// const adminController = require("./controllers/product.controller")

const app = express()
app.use(express.json())
app.use(cors())
// app.use(express.static("views"))

app.use("/admin",userController)
// app.use("/addproduct",productController)
app.post("/register", register)
app.post("/login", login)
// app.use("/products", productController)


module.exports=app

