const jwt = require('jsonwebtoken');
const {secret} = require('../secret.js');
const uuid = require('uuid/v1');
//JWT function
const newToken = (user) => {
    const payload = { username: user.username};
    const options = { algorithm: 'HS256', expiresIn: '1h', jwtid: uuid()};
    return jwt.sign(payload, secret, options);
}
// Protected function
const protected = (req, res, next)  =>{
     const token = req.headers.authorization;
     //verify the token
     if(!token) res.status(401).json({Message:`No token provided`});
     jwt.verify(token, secret, (err, decodedToken) => {
     if(err) res.status(401).json({Message: `Invalid Token`}); //Invalid token
     //token is valid
     console.log('Decoded token:', decodedToken);
     req.username = decodedToken.username;
     next();
     });
};

module.exports = {
   newToken,protected
}