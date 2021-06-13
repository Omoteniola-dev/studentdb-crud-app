const jwt = require("jsonwebtoken");
const { decodeToken } = require("../services/jwtService");
const secret = process.env.JWT_SECRET;

exports.authenticateUser = (req, res, next) => {
    //check if there is an authorization token.
    if(!req.headers.authorization) return res.status(401).json({ message: "Authorization header required" });
    next();
    
    //get the token
    let splittedHeaders = req.headers.authorization.split(" ");
    
    //verify the format
    if(splittedHeaders[0] !== "Bearer") return res.status(500).json({ message: "Authorization header must be in the format Bearer <token>"})
    
    let token = splittedHeaders[1];

    //decode the token
    let decodedToken = decodeToken(token);
    
    //check if valid
    if (!token) return res.status(401).json({ message: "Invalid authorization token. Please login."})
    else return decodedToken;
}

exports.checkIfAdmin = (req, res, next) => {
    
}