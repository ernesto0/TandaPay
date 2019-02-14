const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const app = express();

//body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//DB config
//const db = require('./config/keys').mongoURI;

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));