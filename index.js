const express = require('express')
const fileUpload = require('express-fileupload');
const cors = require('cors');
const morgan = require('morgan');
const lodash = require('lodash');

const app = express();

// set up middleware
app.use(express.json());
app.use(fileUpload({createParentPath:true}));
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))

const HomeRouter = require('./app/routes/home.routes');
const UserRouter = require('./app/routes/user.routes');
const CourseRouter = require('./app/routes/course.routes')

HomeRouter(app);
UserRouter(app);
CourseRouter(app);

// set port, listen for requests
const port = 3000;

app.listen(port, () => {
    console.log(`dbt server is running on localhost:${port}`);
})