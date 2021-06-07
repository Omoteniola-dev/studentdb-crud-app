const jwt = require("jsonwebtoken");
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
    jwt.verify(token, secret, (err, decodedToken) => {
        if(err) return res.status(500).json({ message: err });
        //check if valid
        if (!token) return res.status(401).json({ message: "Invalid authorization token. Please login."})
        else return decodedToken;
    });
}