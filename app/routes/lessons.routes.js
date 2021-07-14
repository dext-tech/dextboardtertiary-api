module.exports = app => {
    const lessons = require("../controllers/lessons.controller.js")

    // create a new lesson
    app.post("/lessons", lessons.create);

    // retrieve all lessons
    app.get("/lessons", lessons.findAll);

    // retrieeve a single lessons with lessonid
    app.get("/lessons/:id", lessons.findOne);

    // update a lesson with lessonid
    app.put("/lessons/:id", lessons.update);

    // delete a lesson with lessonid
    app.delete("/lessons:id", lessons.delete);
}