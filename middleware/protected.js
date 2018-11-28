const jwt = require('jsonwebtoken');

module.exports = protected = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, process.env.JWT_NOTSECRET, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message: 'invalid token' });
            } else {
                req.decodedToken = decodedToken;
                next()
            }
        })
    } else {
        res.status(401).json({ message: 'please sign in' })
    }
}