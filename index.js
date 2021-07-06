const express = require('express')

const port = 3000;

const app = express();
app.use(express.json());

const HomeRouter = require('./app/routes/home.routes.js');
const UserRouter = require('./app/routes/user.routes');

HomeRouter(app);
UserRouter(app);

// set port, listen for requests
app.listen(port, () => {
    console.log(`dbt server is running on localhost:${port}`);
})