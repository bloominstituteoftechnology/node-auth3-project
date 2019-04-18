const jwt = require('jsonwebtoken');

const secrets = require('../config/secrets.js');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if(token) {
        jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
            if(err) {
                res.status(401).json({ You: 'can\'t do that!' });
            } else {
                req.decodedJwt = decodedToken;
                console.log('decoded token', req.decodedJwt);
                next();
            }
        });
    } else {
        res.status(401).json({ You: 'can\'t pass beyond this point!' });
    }
};