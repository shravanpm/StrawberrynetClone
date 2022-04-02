const mongoose = require("mongoose");
const bcrypt = require("bcrypt")


const userSchema = mongoose.Schema({
    name : {type : String, require:true},
    email : {type : String , require:true,unique : true },
    password : {type : String, require : true},
    role : {type:String,enum : ["admin","customer"],default:"customer"}
});

userSchema.pre("save", function(next){
    const hash = bcrypt.hashSync(this.password, 8);
    this.password = hash;
    return next();
})

userSchema.methods.checkPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model("user",userSchema);
