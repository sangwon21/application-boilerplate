const express = require('express');
const app = express();
require('dotenv').config();

const port = 5000;

const mongoose = require('mongoose');
console.log(process.env.PASSWORD);
mongoose
    .connect(
        `mongodb+srv://won:${process.env.PASSWORD}@boilerplate.y0wgj.mongodb.net/test?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: true,
        }
    )
    .then(() => console.log('mondodb connected'));

app.get('/', (req, res) => res.send('Hello World'));

app.listen(port, () => console.log(`Listening on ${port}`));
