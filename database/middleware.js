const knex = require('knex');
const knexConfig = require('../knexfile');
const jwt = require('jsonwebtoken');
const secret = "shh tell noOne";

protect = (req, res, next) => {
    //read the token string from the autorization header
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                res.status(401)
                .json({message: "invalid" })
            } else {
                next();
            }
        })
    } 
    else {
        res.status(401)
           .json({message: "missing token" });
    }
}


tokenGenerator = (user) => {
    const payload = {
        user: user.username,
        password: user.password
    }

    const options = {
        expiresIn: '1h',
    }

    return jwt.sign(payload, secret, options);
}


module.exports = {
    protect,
    tokenGenerator,
}