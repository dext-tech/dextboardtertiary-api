const User = require("../models/user.model.js")

// create and save a new user
exports.create = (request, response) => {
    // validate request
    if (!request.body) {
        response.status(400).send({
            message: "content can not be empty!"
        })
    }

    // create a user
    const user = new User({
        name: request.body.name,
        email: request.body.email
    });

    // save user in the dtabase
    User.create(user, (err, data) => {
        if (err) {
            response.status(500).send({
                message: err.message || "some error occurred while creating the user"
            })
        } else {
            response.send(data)
        }
    })
}

// find all users
exports.findAll = (request, response) => {
    User.getAll((err, data) => {
        if(err){
            response.status(500).send({
                message: err.message || "Some error occurred while retrieving users"
            })
        } else {
            response.send(data);
        }
    })

}

// find a single user with a userid
exports.findOne = (request, response) => {
    User.findById(request.params.userid, (error, data) =>{
        if(error){
            if(error.kind==="not_found"){
                response.status(404).send({
                    message: `Could not find user with id ${request.params.userid}`
                })
            } else {
                response.status(500).send({
                    message: `Error finding user with id ${request.params.userid}`
                })
            }
        } else {
            response.send(data);
        }
    })
}

// update a user identified by the userid in the request
exports.update = (request, response) => {

    // validate request
    if(!request.body){
        response.status(400).send({
            message: "content cannot be empty!"
        })
    }

    User.updateById(
        request.params.userid,
        new User(request.body),
        (error, data)=>{
            if(error){
                if(error.kind === "not_found"){
                    response.status(404).send({
                        message: `could not find user with id ${request.params.userid}`
                    })
                } else {
                    response.status(500).send({
                        message: `Error updating user with id ${request.params.userid}`
                    })
                }
            } else {
                response.send(data);
            }
        }
    )
}

// delete a user with the specified userid in the request
exports.delete = (request, response) => {

    User.remove(request.params.userid, (error, data)=>{
        if(error){
            if(error.kind === "not_found"){
                response.status(404).send({
                    message: `could not user with id ${request.params.userid}`
                })
            } else {
                response.status(500).send({
                    message: `could not delete user with id ${request.params.userid}`
                })
            }
        } else {
            response.send({message: `user was deleted successfully!`})
        }
    })
    
}