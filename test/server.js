//Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const { routeCheck, inputValidation, } = require('../app');
//Global Constant
const PORT = 5003;

//Initialize the App
const app = express();

// bodyParser Middleware
app.use(bodyParser.json({
    limit: '5mb',
    extended: true,
}));

//Headers Settings
app.all('*', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5003');
    next();
});

//The inputValidation middleware
app.use(inputValidation({ checkGet: true, }));

//Exists
app.get('/', (req, res) => {
    res.status(200).json({
        msg: req.body.testField,
    });
});

//Exists but redirect to a non-existing route
app.get('/redirect', (req, res) => {
    res.redirect('/lol');
});

//The error page to be redirected to
app.get('/PnF', (req, res) => {
    res.sendStatus(404);
});

//POST Route
app.post('/', (req, res) => {
    res.status(200).json({
        msg: req.body.testField,
    });
});


app.use(routeCheck(app, { path: '/PnF', }));


const server = app.listen(PORT);

module.exports = { server, };


