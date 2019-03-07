const jwt = require('jsonwebtoken');
const secrets = require('../secrets/secrets');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
  
    if ( token ) {
        jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
            if(err){
                res.status(401).json('No Entrance For You!')
            } else {
                req.decodedJwt = decodedToken;
                console.log('decoded token', req.decodedJwt)
                next();
            } 
        });
       
    }  else {
       
        res.status(401).json('none shall pass')
    }
};