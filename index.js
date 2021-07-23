require('dotenv').config()
const express = require('express')
const fileUpload = require('express-fileupload');
const cors = require('cors');
const morgan = require('morgan');
const myIp = require('./net/net');

const app = express();

const { API_PORT } = process.env;

// set up middleware
app.use(express.json());
app.use(fileUpload({createParentPath:true}));
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))
app.use(cors({origin:`http://localhost:${API_PORT}`}))


const HomeRouter = require('./app/routes/home.routes');
const LecturerRouter = require('./app/routes/lecturer.routes');
const CourseRouter = require('./app/routes/course.routes');
const FilesRouter = require('./app/routes/files.routes');
const LessonsRouter = require('./app/routes/lessons.routes');
const AuthRouter = require('./app/routes/auth.routes');
const UserRouter = require('./app/routes/users.routes');

HomeRouter(app);
LecturerRouter(app);
CourseRouter(app);
FilesRouter(app);
LessonsRouter(app);
UserRouter(app);
AuthRouter(app);

app.listen(API_PORT, () => {
    console.log(`dbt server is running on ${myIp}:${API_PORT}`);
})

// TODO implement migration https://itnext.io/updating-an-sql-database-schema-using-node-js-6c58173a455a