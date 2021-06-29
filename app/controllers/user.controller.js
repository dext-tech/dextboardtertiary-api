const User = require("../models/user.model.js")

// create and save a new user
exports.create = (req, res) => {
    // validate request
    if (!req.body) {
        res.status(400).send({
            message: "content can not be empty!"
        })
    }

    // create a user
    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.emal,
        password: req.body.password,
        type: req.body.type
    });

    // save user in the dtabase
    User.create(user, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "some error occurred while creating the user"
            })
        } else {
            res.send(data)
        }
    })
}

// find all users
exports.findAll = (req, res) => {

}

// find a single user with a userid
exports.findOne = (req, res) => {

}

// update a user identified by the userid in the request
exports.update = (req, res) => {

}

// delete a user with the specified userid in the request
exports.delete = (req, res) => {

}