const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
const env = require('dotenv').config().parsed;
const moment = require('moment')



exports.register = async(req, res) => {

    // use jwt to sign the credentials and `bcrypt` to encrypt 
    // the password before storing them in a database

    // get user input

    // validate user input

    // validate if the user already exists

    // encrypt the user password

    // create a signed jwt token    

    const users = require("../controllers/user.controller.js")


    // register login
    try{
        // get user input
        const {first_name, last_name, email, password } = req.body;

        // validate user input
        if(!(email && password && first_name && last_name)){
            res.status(400).send("all input is required")
        }

        // check if user already exists
        // validate if user exists in our database
        const oldUser = await users.authfindOne(email)

        if(oldUser){
            return res.status(409).send("User already exists. please login")
        }

        // encrypt user password
        const encryptedPassword = await bcrypt.hash(password, 10)

        // create token
        const token = jwt.sign(
            { "email":email, "iat":moment().unix() },
            env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );


        // create user in our database
        const user = await users.authRegister({
            first_name,
            last_name,
            email: email.toLowerCase(),
            password: encryptedPassword,
            token
        })

        // return new user
        res.status(201).json(user);

    } catch (err){
        console.log(err)
    }

}

exports.login = async(req, res) => {
    // login
}