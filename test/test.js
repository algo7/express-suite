const express = require('express');
const routeCheck = require('../app').routeCheck;

//Global Constant
const PORT = process.env.PORT || 5000;

//Initialize the App
const app = express();


app.get('/', (req, res) => {
    res.sendStatus(200);
});

app.use(routeCheck(app));


//Start the app
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
