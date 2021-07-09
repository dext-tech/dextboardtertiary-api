const Course = require("../models/course.model")

// create and save a new course
exports.create = (request, response) => {
    // validate request
    if(!request.body){
        response.status(400).send({
            message: "content cannot be empty!"
        })
    }

    // create a course
    const course = new Course({
        label: request.body.label,
        creditHours: request.body.creditHours,
        lecturerId: request.body.lecturerId
    });

    // save course in the database
    Course.create(course, (err, data)=>{
        if(err){
            response.status(500).send({
                message: err.message || "some error occurred while creating the course"
            })
        } else {
            response.send(data)
        }
    })

}

// find all courses
exports.findAll = (request, response) => {
    Course.getAll((err, data) => {
        if(err){
            response.status(500).send({
                message: err.message || "some error occurred while retrieving courses"
            })
        } else {
            response.send(data);
        }
    })
}

// find a single course with a courseid
exports.findOne = (request, response) => {
    Course.findById(request.params.id, (error, data) => {
        if(error){
            if(error.kind === "not_found"){
                response.status(404).send({
                    message: `Could not find course with id ${request.params.id}`
                })
            } else {
                response.status(500).send({
                    message: `Error finding course with id ${request.params.id}`
                })
            }
        } else {
            response.send(data);
        }
    })
}

// update a course identified by the courseid in the request
exports.update = (request, response) => {

    // validate request
    if(!request.body){
        response.status(400).send({
            message: "content cannot be empty!"
        })
    }

    Course.updateById(
        request.params.id,
        new Course(request.body),
        (error, data) => {
            if(error){
                if(error.kind === "not_found"){
                    response.status(404).send({
                        message: `could not find course with id ${request.params.id}`
                    })
                } else {
                    response.status(500).send({
                        message: `Error updating course with id ${request.params.id}`
                    })
                }
            } else {
                response.send(data);
            }
        }
    )
}