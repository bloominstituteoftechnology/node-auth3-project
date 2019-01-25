const jwt = require('jsonwebtoken');
const config = require('../config/authConfig.js');

module.exports = {
    generateToken: (username) => {
        const payload = {
            username: username
        }
        const secret = config.secret;
        const options = {
            expiresIn: '30s',
            jwtid: '12345'
        }
        return jwt.sign(payload, secret, options);
    }
};