module.exports = app => {
    const lecturers = require("../controllers/lecturer.controller.js")

    // Create a new lecturer
    app.post("/lecturers", lecturers.create);

    // retrieve all lecturers
    app.get("/lecturers", lecturers.findAll);

    // retrieve a single lecturer with lecturerid
    app.get("/lecturers/:id", lecturers.findOne);

    // update a lecturer with lecturerid
    app.put("/lecturers/:id", lecturers.update);

    // delete a lecturer with lecturerid
    app.delete("/lecturers/:id", lecturers.delete);

}