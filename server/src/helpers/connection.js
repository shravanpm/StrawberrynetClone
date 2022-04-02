const mongoose =  require('mongoose');
const { dbCredentials } = require('../config'); 

module.exports = async () => {
    const connectionString = `mongodb+srv://${dbCredentials.userName}:${dbCredentials.password}@cluster0.blzg8.mongodb.net/${dbCredentials.databaseName}?retryWrites=true&w=majority`;
    return mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
};
