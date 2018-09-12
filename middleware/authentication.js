const jwt = require('jsonwebtoken');

const secret = 'banana';

function generateToken(user) {
    const payload = {
        username: user.username,
    };
    const options = {
        expiresIn: '1h',
        jwtid: '12345' //jti
    };
    return jwt.sign(payload, secret, options);
}

function protected(req, res, next) {
    // use jwts instead of sessions
    // read the token string from the authorization header
    const token = req.headers.authorization;
    if (token) {

        // verify the token
        jwt.verify(token, secret, (err, decodedToken) => {
            if(err) {
                // token is invalid
                res.status(401).json({ message: 'Invalid Token' });
            } else {
                // token is valid
                next();
            }
        });
    } else {
        res.status(401).json({ message: 'No token provided' });
    } 
}

module.exports = {
    generateToken,
    protected
}