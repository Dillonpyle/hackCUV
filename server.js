require('dotenv').config()
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require('express-session');
const cors = require('cors');
const path = require('path');

require('./db/db');

//middleware
app.use(express.static(path.join(__dirname, 'Public/build')));

app.use(session({
    secret: "THIS IS A RANDOM STRING SECTRET",
    resave: false,
    saveUninitialized: false
}));

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// cors 
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));

//routes
const user = require('./controllers/users');
const bill = require('./controllers/bills');
app.use('/users', user);
app.use('/bills', bill);

// Handles any requests that don't match the ones above
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname + '/Public/build/index.html'));
// });

//server
app.listen(process.env.PORT || 'http://localhost:9000', () => {
    console.log('listening on port 9000');
})