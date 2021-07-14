const express = require('express')
const fileUpload = require('express-fileupload');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// set port, listen for requests
const port = 3000;

// set up middleware
app.use(express.json());
app.use(fileUpload({createParentPath:true}));
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))
app.use(cors({origin:`http://localhost:${port}`}))


const HomeRouter = require('./app/routes/home.routes');
const UserRouter = require('./app/routes/user.routes');
const CourseRouter = require('./app/routes/course.routes');
const FilesRouter = require('./app/routes/files.routes');
const LessonsRouter = require('./app/routes/lessons.routes');

HomeRouter(app);
UserRouter(app);
CourseRouter(app);
FilesRouter(app);
LessonsRouter(app);

app.listen(port, () => {
    console.log(`dbt server is running on localhost:${port}`);
})