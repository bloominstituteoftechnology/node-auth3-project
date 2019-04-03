const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/secrets.js');

 module.exports = (req, res, next) => {
    const token = req.headers.authorization;

     if ( token ) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if(err){
                res.status(401).json('You shall not pass!')
            } else {
                req.decodedJwt = decodedToken;
                console.log('decoded token', req.decodedJwt)
                next();
            } 
        });

     }  else {

         res.status(401).json('You shall not pass!')
    }
}; 