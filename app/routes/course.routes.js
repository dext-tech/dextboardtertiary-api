module.exports = app => {

    const courses = require("../controllers/course.controller.js")

    // create a new course
    app.post("/course", courses.create);

    // retrieve all courses
    app.get("/course", courses.findAll);

    // retrieve a single course with courseId
    app.get("/course/:id", courses.findOne);

    // update a course with courseId
    app.put("/courses/:id", courses.update)

    // delete a course with courseId
    app.delete("/courses/:id", courses.delete)

}