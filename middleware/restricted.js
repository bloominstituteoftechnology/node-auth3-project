const jwt = require('jsonwebtoken');
const secrets = require('../middleware/secrets');


module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if(req.decodedJwt){
        next();
    } else if (token) {
        jwt.verify(token, secrets.jwtSecret, (error, decodedJwt) => {
            if(error){
                res.status(401).json({message: 'no token'})
            } else {
                req.decodedJwt = decodedJwt;
                next();
            }
        })
    } else {
        res.status(401).json({message: 'ugh something is wrong'})
    }
}