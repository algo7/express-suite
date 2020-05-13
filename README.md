# express-suite

## A collection of Middlewares for Express

[![Maintainability](https://api.codeclimate.com/v1/badges/48a4f566a0ab37a4f5d4/maintainability)](https://codeclimate.com/github/algo7/express-suite/maintainability)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/230d4840e65c45e2bc7682ee4659a7c9)](https://www.codacy.com/manual/algo7/express-suite?utm_source=github.com&utm_medium=referral&utm_content=algo7/express-suite&utm_campaign=Badge_Grade)
[![](https://img.shields.io/github/license/algo7/express-suite)]()
[![](https://img.shields.io/github/issues/algo7/express-suite)]()
[![](https://img.shields.io/github/forks/algo7/express-suite)]()
[![](https://img.shields.io/github/stars/algo7/express-suite)]()
[![npm version](https://badge.fury.io/js/express-suite.svg)](https://badge.fury.io/js/express-suite)
[![](https://img.shields.io/npm/dt/express-suite)]()

## Installation

```
$ npm i express-suite
```

## routeCheck

This middleware will handle all requests to non-registered routes for you.

In the config option, you can specify a route to handle all requests to non-existing routes. For example, a custom page-not-found notice.

If no config option is passed, the middleware will send a **404** to those requests.

```javascript
//Dependencies
const express = require('express');

//Require the routeCheck Middleware
const { routeCheck } = require('express-suite');

//Initialize the App
const app = express();

//Load Routes
const example = require('./routes/example');

//Use Routes
app.use('/', example);

//The routeCheck middleware config option
//The path refers to the custom route you want to redirect the requests to
const option = {
  path: '/PnF',
};

//It's important to use the routeCheck middleware after all routes are loaded
app.use(routeCheck(app, option));

//Start the server
app.listen(5003);
```

## emptyInputCheck

This middleware validates all inputs to all routes (unless used at router level) by checking the **body** of both POST and GET requests.

```javascript
//Dependencies
const express = require('express');
const bodyParser = require('body-parser');

//Require the routeCheck Middleware
const { emptyInputCheck } = require('../app');

//Initialize the App
const app = express();

// bodyParser Middleware
app.use(
  bodyParser.json({
    limit: '5mb',
    extended: true,
  }),
);

//The emptyInputCheck Middleware
app.use(
  emptyInputCheck({
    checkGet: true,
  }),
);

//Load Routes
const example = require('./routes/example');

//Use Routes
app.use('/', example);

//Start the server
app.listen(5003);
```

## Tests

The poject uses **Jest** for testing.

Clone the Github repo. first. Install the dependencies then run `npm test`

```
$ git clone https://github.com/algo7/express-suite.git
$ cd express-suite
$ npm i
$ npm test
```

## License

[Apache License 2.0](https://github.com/algo7/express-suite/blob/master/LICENSE)
