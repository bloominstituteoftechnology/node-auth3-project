const jwt = require('jsonwebtoken');
const secrets = require('./secrets.js');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
        if(err) {
            //invalid or expired token
            res.status(401).json({ message: "Costs 1 token to play this game."})
        } else {
            //valid token
            req.decodedToken = decodedToken;
            next();
        }
    });
};