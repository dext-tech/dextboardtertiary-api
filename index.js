const express = require('express')

const port = 3000;

const app = express();

const HomeRouter = require('./app/routes/home.routes.js');

HomeRouter(app);

// set port, listen for requests
app.listen(port, () => {
    console.log(`dextboard-t server is running on localhost:${port}.`);
})