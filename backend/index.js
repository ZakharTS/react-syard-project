require('dotenv').config();
const express = require('express');
const sequelize = require('./database'); 
const models = require('./models/models');
const cors = require('cors');
const upload = require('express-fileupload');
const router = require('./routes/index');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(upload({}));
app.use('/api', router);

const start = async() => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(process.env.PORT, (e) => {
            if (e) {
                return console.log(e);
            }
            console.log('Server started.');
        });
    } catch (e) {
        console.log(e);
    }
}

start();
