    const mongoose = require("mongoose");
    const bcrypt = require("bcryptjs")

     const employeeSchema = new mongoose.Schema({
         fname :{
             type : String,
             required : true
         },
         lname :{
            type : String,
            required : true
        },
        email :{
            type : String,
            required : true,
            unique : true
        },
        password :{
            type : String,
            required : true
        }
     })

     employeeSchema.pre("save", async function(next){
            //  const passwordHash = await bcrypt.hash(password,10);
            if(this.isModified("password")){
                // console.log(`the current password is ${this.password}`);
                this.password = await bcrypt.hash(this.password,10);
                // console.log(`the current password is ${this.password}`);
            }
             

             next();
     })

     const Register = new mongoose.model("Register",employeeSchema);
     module.exports = Register;