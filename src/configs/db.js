const mongoose = require("mongoose");

mongoose

const connect = async () => {
  return mongoose.connect("mongodb+srv://prathyu:u4project@cluster0.hwsag.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
  };

  module.exports = connect
