const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const expiry = process.env.EXPIRY;

exports.createToken = (user) => {
    try{
        let token = jwt.sign({
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username
        },
        secret, {expiresIn: expiry});
        return token;
    }
    catch(err){
        return err;
    }
}

exports.decodeToken = (token) => {
    try{
        let decodedToken = jwt.verify(token, secret);
        return decodedToken;
    }
    catch(err){
        return err;
    }
}