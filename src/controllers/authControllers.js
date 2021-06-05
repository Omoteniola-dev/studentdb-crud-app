const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "Asecret";
const expiry = 4800;

// create a new user
exports.createNewUser = (req, res) =>{
    User.findOne({username: req.body.username}, (err, existingUser) => {
        if (err) return res.status(500).json({ message: err })
        if (existingUser) return res.status(400).json({ message: "User already exists."})
    })
    
    User.create({
        ...req.body
    }, (err, newUser) => {
        if (err) return res.status(500).json({ message: err });
        else{
            //Salt and hash the user's password
            bcrypt.genSalt(10, (err, salt) => {
                if (err) return res.status(500).json({ message: err});
                bcrypt.hash(req.body.password, salt, (err,hashedPassword) => {
                    if (err) return res.status(500).json({ message: err});
                    // save hashed password to database
                    newUser.password = hashedPassword;
                    newUser.save((err, savedUser) => {
                        if (err) return res.status(500).json({ message: err});
                        // create JWT for savedUser.
                        
                        jwt.sign({
                            firstname: savedUser.firstname,
                            lastname: savedUser.lastname,
                            username: savedUser.username
                        },
                        secret, {expiresIn: expiry}, (err, token) => {
                            if (err) return res.status(500).json({ message: err });

                            //send token to user
                            if(!token) return res.status(500).json({ message: "Sorry, we could not authenticate you. Please login"})
                            else return res.status(200).json({ message: "user registration successful", token})
                        })
                    
                        
                        
                    })
                })
            })
        }
    })
}

// login a user
exports.loginUser = (req, res) => {
    // check if the provided username and password matches any on the database
    // grant access to user if it does
}