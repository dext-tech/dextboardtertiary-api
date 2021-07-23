const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const env = require('dotenv').config().parsed;
const moment = require('moment')

const usermodel = require("../models/user.model.js")


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
        const oldUser = await usermodel.findByEmail(email)

        if(oldUser){
            return res.status(409).send("User already exists. please login")
        }

        // encrypt user password
        const encryptedPassword = await bcrypt.hash(password, 10)

        // create user in our database
        const user = await usermodel.registerUser({
            first_name,
            last_name,
            email: email.toLowerCase(),
            password: encryptedPassword
        })

        // return the new user
        res.status(201).json({
            "user": {
                "id" : user.id,
                "first_name" : user.first_name,
                "last_name": user.last_name,
                "email" : user.email,
            }
        });

    } catch (err){
        console.log(err)
    }

}

exports.login = async (req, res) => {
    // login

    try{
        // get user input
        const { email, password } = req.body;

        // validate user input
        if(!(email && password)){
            res.status(400).send("all input is required")
            return
        }
    
        // validate if user exists in our database
        const user = await usermodel.findByEmail(email)

        if(user.password == undefined){
            res.status(400).send("user not found")
            return
        }

        const verifyPassword = await bcrypt.compare(password, user.password)

        if(user && verifyPassword){
            // create token
            const token = jwt.sign(
                { "email" : email },
                env.TOKEN_KEY
            )

            res.status(200).json({
                "token":token, 
                "user": {
                    "id" : user.id,
                    "first_name" : user.first_name,
                    "last_name": user.last_name,
                    "email" : user.email,
                }
            })
            return
        }

        res.status(400).send("Invalid Credentials")

    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}

// TODO write better error messages