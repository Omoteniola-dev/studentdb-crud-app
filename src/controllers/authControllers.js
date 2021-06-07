const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const expiry = process.env.EXPIRY;

// create a new user
exports.createNewUser = (req, res) =>{
    // Check if a user with the username exist
    User.findOne({username: req.body.username}, (err, existingUser) => {
        if (err) return res.status(500).json({ message: err })
        if (existingUser) return res.status(400).json({ message: "User already exists."});

    })

    //create a new user
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
    User.findOne({ username: req.body.username}, (err, foundUser) => {
        if(err) return res.status(500).json({ message: err});
        if(!foundUser) return res.status(401).json({ message: "Incorrect username"});

        console.log(foundUser);
        // Check if the password is correct with the one in the database.
        let match = bcrypt.compare(req.body.password, foundUser.password);
        if(!match) return res.status(500).json({ message: "Incorrect password"});

        // create JWT for foundUser.
        jwt.sign({
            firstname: foundUser.firstname,
            lastname: foundUser.lastname,
            username: foundUser.username
        },
        secret, {expiresIn: expiry}, (err, token) => {
            if (err) return res.status(500).json({ message: err });

            //send token to user
            if(!token) return res.status(500).json({ message: err })
            else return res.status(200).json({ message: "login successful", token})
        });
        
    });
};