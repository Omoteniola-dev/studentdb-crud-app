const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const expiry = process.env.EXPIRY;

// create a new user
exports.createNewUser = async (req, res) =>{
    // Check if a user with the username exist
    try{
        const existingUser = await User.findOne({username: req.body.username});
        if(existingUser) {
            return res.status(400).json({ message: "User already exists"});
        }

    }
    catch(err){
        return res.status(500).json({ message: err });
    }

    //create a new user
    try{
        const newUser = await User.create({ ...req.body });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        newUser.password = hashedPassword;
        const savedUser = await newUser.save();
        // Create a JWT
        const token = await jwt.sign({ 
            firstname: savedUser.firstname,
            lastname: savedUser.lastname,
            username: savedUser.username
        },
        secret, {expiresIn: expiry});

        //send token to user
        if(!token) return res.status(500).json({ message: "Sorry, we could not authenticate you. Please login"});
        else return res.status(200).json({ message: "user registration successful", token});

    }
    catch(err){
        throw err
    }
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