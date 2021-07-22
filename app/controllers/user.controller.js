const User = require("../models/user.model")

// create and save a new user
exports.create = (request, response) => {
    // validate request
    if(!request.body){
        response.status(400).send({
            message: "content cannot be empty!"
        })
    }

    // create a user
    const user = new User({
        first_name: request.body.first_name,
        last_name: request.body.last_name,
        email: request.body.email,
        password: request.body.password,
        token: request.body.token
    })

    // save user in the database
    User.create(user, (err, data)=>{
        if(err){
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
                message: err.message || "some error occurred while retrieving users"
            })
        } else {
            response.send(data);
        }
    })
}

// find a single user with userid
exports.findOne = (request, response) => {
    User.findById(request.params.id, (error, data) => {
        if(error){
            if(error.kind === "not_found"){
                response.status(404).send({
                    message: `Could not find user with id ${request.params.id}`
                })
            } else {
                response.status(500).send({
                    message: `error finding user with id ${request.params.id}`
                })
            }
        } else {
            response.send(data)
        }
    })
}

exports.authfindOne = (email) => {
    User.findByEmail(email, (error, data) => {
        if(error){
            if(error.kind === "not_found"){
                return ({
                    message: `Could not find user with email ${email}`
                })
            } else {
                return ({
                    message: `error finding user with email ${email}`
                })
            }
        } else {
            return data;
        }
    })
}

// create and save a new user
exports.authRegister = (newUser) => {
    // validate request
    if(!newUser){
        return({
            message: "content cannot be empty!"
        })
    }

    // create a user
    const user = new User({
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        password: newUser.password,
        token: newUser.token
    })

    // save user in the database
    User.create(user, (err, data)=>{
        if(err){
            return({
                message: err.message || "some error occurred while creating the user"
            })
        } else {
            return data
        }
    })
}

exports.update = (request, response) => {
    // validate request
    if(!request.body){
        response.status(400).send({
            message: "content cannot be empty"
        })
    }

    User.updateById(
        request.params.id,
        new User(request.body),
        (error, data) => {
            if(error){
                if(error.kind === "not_found"){
                    response.status(404).send({
                        message: "could not find user with id " + request.params.id
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

// delete a user with the specified userid in the request
exports.delete = (request, response) => {
    User.remove(request.params.id, (error, data) => {
        if(error){
            if(error.kind === "not_found"){
                response.status(404).send({
                    message: "could not find user with id " + request.params.id
                })
            } else {
                response.status(500).send({
                    message: "could not delete user with id " + request.params.id
                })
            }
        } else {
            response.send({message: "user was delete successfully"})
        }
    })
}


