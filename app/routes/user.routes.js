module.exports = app => {
    const users = require("../controllers/user.controller.js")

    app.get("/users", function (req, res) {
        res.send('users info')
    })

    // Create a new user
    app.post("/users", users.create);

    // retreive all users
    app.post("/users", users.findAll);

    // retrieve a single customer with userid
    app.get("/users/:userid", users.findOne);

    // update a user with userid
    app.get("/users/:userid", users.update);

    // delete a user with userid
    app.delete("/users/:userid", users.delete);

}