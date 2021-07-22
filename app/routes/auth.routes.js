const authController = require("../controllers/auth.controller.js")


module.exports = app => {

    app.post("/register", authController.register)
    // app.post("/register", (req,res)=>{
    //     const {first_name, last_name, email, password } = req.body;

    //     res.status(200).send({
    //         message: email
    //     })
    // })

    app.post("/login", authController.login)

}