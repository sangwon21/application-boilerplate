const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const config = require('./config/key');
const { User } = require('./models/User');

require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = 5000;

mongoose
    .connect(config.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true,
    })
    .then(() => console.log('mondodb connected'))
    .catch((err) => console.error(err));

app.get('/', (req, res) => res.send('Hello World'));
app.post('/register', (req, res) => {
    const user = new User(req.body);
    user.save((err, doc) => {
        if (err) {
            return res.json({ success: false, err });
        }
        return res.status(200).json({
            success: true,
        });
    });
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
