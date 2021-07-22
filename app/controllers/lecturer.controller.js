const Lecturer = require("../models/lecturers.model.js")

// create and save a new lecturer
exports.create = (request, response) => {
    // validate request
    if (!request.body) {
        response.status(400).send({
            message: "content can not be empty!"
        })
    }

    // create a lecturer
    const lecturer = new Lecturer({
        name: request.body.name,
        email: request.body.email
    });

    // save lecturer in the dtabase
    Lecturer.create(lecturer, (err, data) => {
        if (err) {
            response.status(500).send({
                message: err.message || "some error occurred while creating the lecturer"
            })
        } else {
            response.send(data)
        }
    })
}

// find all lecturers
exports.findAll = (request, response) => {
    Lecturer.getAll((err, data) => {
        if(err){
            response.status(500).send({
                message: err.message || "Some error occurred while retrieving lecturers"
            })
        } else {
            response.send(data);
        }
    })

}

// find a single lecturer with a lecturerid
exports.findOne = (request, response) => {
    Lecturer.findById(request.params.id, (error, data) =>{
        if(error){
            if(error.kind==="not_found"){
                response.status(404).send({
                    message: `Could not find lecturer with id ${request.params.id}`
                })
            } else {
                response.status(500).send({
                    message: `Error finding lecturer with id ${request.params.id}`
                })
            }
        } else {
            response.send(data);
        }
    })
}

// update a lecturer identified by the lecturerid in the request
exports.update = (request, response) => {

    // validate request
    if(!request.body){
        response.status(400).send({
            message: "content cannot be empty!"
        })
    }

    Lecturer.updateById(
        request.params.id,
        new Lecturer(request.body),
        (error, data)=>{
            if(error){
                if(error.kind === "not_found"){
                    response.status(404).send({
                        message: `could not find lecturer with id ${request.params.id}`
                    })
                } else {
                    response.status(500).send({
                        message: `Error updating lecturer with id ${request.params.id}`
                    })
                }
            } else {
                response.send(data);
            }
        }
    )
}

// delete a lecturer with the specified lecturerid in the request
exports.delete = (request, response) => {

    Lecturer.remove(request.params.id, (error, data)=>{
        if(error){
            if(error.kind === "not_found"){
                response.status(404).send({
                    message: `could not find lecturer with id ${request.params.id}`
                })
            } else {
                response.status(500).send({
                    message: `could not delete lecturer with id ${request.params.id}`
                })
            }
        } else {
            response.send({message: `lecturer was deleted successfully!`})
        }
    })

}