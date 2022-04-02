const cors = require('cors');
const express = require('express');
const routes = require('./routes');
const { port } = require('./config');
const connectDb = require('./helpers/connection');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', routes);

app.listen(port, () => {
    connectDb().then(() => {
        console.log('MongoDb connected ⛄');
    }).catch(err => console.log(`Faild to connect DB, Error:${err.message}`));

    console.log(`Server listening at http://localhost:${port} 🚀`);
});
