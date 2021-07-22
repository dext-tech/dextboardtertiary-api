const authController = require("../controllers/auth.controller.js")


module.exports = app => {

    app.post("/register", authController.register)

    app.post("/login", authController.login)

}