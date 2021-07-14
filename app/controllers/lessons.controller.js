const Lesson = require("../models/lessons.model")

// create and save a new lesson
exports.create = (request, response) => {
    // validate request
    if(!request.body){
        response.status(400).send({
            message: "content can not be empty!"
        })
    }

    // create a lesson
    const lesson = new Lesson({
        courseId : request.body.courseId,
        startTime : request.body.startTime,
        endTime : request.body.endTime,
        venueId : request.body.venueId,
        status : request.body.status
    })

    // save lesson in the database
    Lesson.create(lesson, (err, data) => {
        if(err){
            response.status(500).send({
                message: err.message || "some error occured while creating the lesson"
            })
        } else {
            response.send(data)
        }
    })
}


// find all lessons
exports.findAll = (request, response) => {
    Lesson.getAll((err, data) => {
        if(err){
            response.status(500).send({
                message: err.message || "some error occurred while retrieving lessons"
            })
        } else {
            response.send(data)
        }
    })
}

// find a single lesson with a userid
exports.findOne = (request, response) => {
    Lesson.findById(request.params.id, (error, data) => {
        if(error){
            if(error.kind === "not_found"){
                response.status(404).send({
                    message: "could not find lesson with id " + request.params.id
                })
            } else {
                response.status(500).send({
                    message: "error finding lesson with id " + request.params.id
                })
            }
        } else {
            response.send(data)
        }
    })
}

exports.update = (request, response) => {
    // validate request
    if(!request.body){
        response.status(400).send({
            message: "conent cannot be empty"
        })
    }

    Lesson.updateById(
        request.params.id,
        new Lesson(request.body),
        (error, data) => {
            if(error){
                if(error.kind === "not_found"){
                    response.status(404).send({
                        message: "could not find lesson with id " + request.params.id
                    })
                } else {
                    response.status(500).send({
                        message: "error updating user with id " + request.params.id
                    })
                }
            } else {
                response.send(data)
            }
        }
    )
}