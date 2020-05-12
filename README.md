# express-suite

## A collection of Middlewares for Express

### routeCheck

This middleware will handle all requests to non-registered routes for you.

In the config option, you can specify a route to handle all requests to non-existing routes. For example, a custom page-not-found notice.

If no config option is passed, the middleware will send a **404** to those requests.

```javascript
const express = require('express');

//Require the routeCheck Middleware
const routeCheck = require('../app').routeCheck;

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
