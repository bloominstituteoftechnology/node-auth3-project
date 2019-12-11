const jwt = require('jsonwebtoken');

module.exports = function generateToken(user) {
    const payload = {
        userid: user.id,
        username: user.username,
        department: user.department
    };

    const options = {
        expiresIn: '1h'
    };

    return jwt.sign(payload, process.env.JWT_SECRET, options);
}