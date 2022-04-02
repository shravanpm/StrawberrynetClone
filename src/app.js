const exp = require("constants");
const express = require("express");
const app = express();
const path = require("path");
const bcrypt = require("bcryptjs");
const { json } = require("express");
// const port = process.env.PORT || 5000;
require("./db/conn");

const Register = require("./models/registers")

app.use(express.json());
app.use(express.urlencoded({extended:false}))

const static_path = path.join(__dirname, "../public");
// console.log(path.join (__dirname,"../public"))
app.use(express.static(static_path));

app.get("/", (req, res) => {
    // res.sendFile(path.join(__dirname + '/public/login.html'));
    res.render("home");
    // return res.send(`hii from registeration part`);
});

app.get("/register", (req, res)=>{
    res.render("register");
})
app.get("/login", (req, res)=>{
    res.render("login");
})

app.post("/register", async (req,res)=>{
    try {
        const registerEmployee = new Register({
            fname : req.body.fname,
            lname : req.body.lname,
            email : req.body.email,
            password : req.body.password
        })

      const registered =  await registerEmployee.save();
      res.status(201).render("index");
    } catch (error) {
        res.status(400).send(error)
    }
})


// check user login 

app.post("/login", async (req,res)=>{
    try {
        const email = req.body.email;
        const password =  req.body.password;
       console.log(`${email} and password is ${password}`)
        const useremail = await Register.findOne({email: email});
        // res.send(useremail);
        // console.log(useremail);
        const isMatch =  await bcrypt.compare(password, useremail.password)

        if(isMatch){
            res.status(201).render("home");
        }
        else{
            res.send("invalid login details");
        }
    } catch (error) {
        res.status(400).send("invalid login details")
    }
})

app.listen(5000, () => {
  console.log(`listening on port 5000`);
});
