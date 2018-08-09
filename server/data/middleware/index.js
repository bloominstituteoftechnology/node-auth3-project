const jwt = require('jsonwebtoken');
// recommend setting environment variable
const secret = process.env.MY_SECRET;

module.exports = {
    genToken: function (record) {
        const payload = {
            userId: record.id
        };
        const options = {
            expiresIn: '1h'
        }
        return jwt.sign(payload, secret, options);
    },
    protected: function (req, res, next) {
        const token = req.headers.authorization;

        if (token) {
            jwt.verify(token, secret, (err, decodedToken) => {
                if (err) {
                    res.status(401).json({error: 'You shall not pass!!!'});
                } else {
                    next();
                }
            });
        } else {
            res.status(401).json({error: 'You shall not pass!!!'});
        }
    }
}