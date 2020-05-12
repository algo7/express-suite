//Dependencies
const express = require('express');
const routeCheck = require('../app').routeCheck;
//Global Constant
const PORT = 5003;

//Initialize the App
const app = express();


app.all('*', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5003');
    next();
});

//Exists
app.get('/', (req, res) => {
    res.sendStatus(200);
});

//Exists but redirect to a non-existing route
app.get('/redirect', (req, res) => {
    res.redirect('/lol');
});

//The error page to be redirected to
app.get('/PnF', (req, res) => {
    res.sendStatus(404);
});


app.use(routeCheck(app, { path: '/PnF', }));

const server = app.listen(PORT);

module.exports = { server, };


