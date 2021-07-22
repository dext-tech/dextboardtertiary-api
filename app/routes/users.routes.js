module.exports = app => {
    const users = require("../controllers/user.controller.js")

    // Create a new user
    app.post("/users", users.create);

    // retrieve all users
    app.get("/users", users.findAll);

    // retrieve a single user with userid
    app.get("/users/:id", users.findOne);

    // update a user with userid
    app.put("/users/:id", users.update);

    // delete a user with userid
    app.delete("/users/:id", users.delete);

}