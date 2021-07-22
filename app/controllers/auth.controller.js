const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
const env = require('dotenv').config().parsed;
const moment = require('moment')

const users = require("../controllers/user.controller.js")


// TODO if only the admin can register, then you don't need to generate a jwt on register for a user

exports.register = async(req, res) => {

    // use jwt to sign the credentials and `bcrypt` to encrypt 
    // the password before storing them in a database

    // get user input

    // validate user input

    // validate if the user already exists

    // encrypt the user password

    // create a signed jwt token    



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

        // // create token
        // const token = jwt.sign(
        //     { "email":email },
        //     env.TOKEN_KEY
        // );


        // create user in our database
        const user = await users.authRegister({
            first_name,
            last_name,
            email: email.toLowerCase(),
            password: encryptedPassword
        })

        // return new user
        // res.status(201).json({ user, "token" : token });
        res.status(201).json(user);

    } catch (err){
        console.log(err)
    }

}

exports.login = async(req, res) => {
    // login

    try{
        // get user input
        const { email, password } = req.body;

        // validate user input
        if(!(email && password)){
            res.status(400).send("all input is required")
        }

        // validate if user exists in our database
        const user = await User.authfindOne(email);

        if(user && (await bcrypt.compare(password, user.password))){
            // create token
            const token = jwt.sign(
                { "email" : email },
                env.TOKEN_KEY
            )
        
            user.token = token;

            res.status(200).json({user, "token" : token})
        }

        res.status(400).send("Invalid Credentials")

    } catch (err) {
        console.log(err);
    }
}

// TODO write better error messages