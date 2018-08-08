const jwt = require('jsonwebtoken');

module.exports = {
    genToken: function (newRecord) {
        const payload = {
            username: newRecord.username
        };
        const secret = 'nobody tosses a dwarf!';
        const options = {
            expiresIn: '1h'
        }
        return jwt.sign(payload, secret, options);
    }
}