const jwt = require('jsonwebtoken');
const secret = require('../secrets.js');


module.exports = (req, res, next) => {
    
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, secret.jwtSecret, (err, decodedToken) => {
            if (err) {
                res.status(401).json({message: 'not authorized'});

            } else {
                req.user = {
                    username: decodedToken.username,
                    departments: decodedToken.departments,
                  };
                next();
            }
        })
    } else {
        res.status(400).json({message: 'no auth token provided'});
    }

    // if (req.session && req.session.user) {
    //     next();    
    // } else {
    //     res.status(401).json({err : 'you shall not pass'});
    // }
};
