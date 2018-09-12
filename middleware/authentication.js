const jwt = require('jsonwebtoken');

function generateToken(user) {
    const payload = {
        username: user.username,
    };
    const secret = 'banana';
    const options = {
        expiresIn: '1h',
        jwtid: '12345' //jti
    };
    return jwt.sign(payload, secret, options);
}

function protected(req, res, next) {

    next();
}

module.exports = {
    generateToken,
    protected
}