const jwt = require('jsonwebtoken');

const jwtSecret = 'hXK2s4RtL2q';

function protected(req, res, next) {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message: 'invalid token' });
            } else {
                req.decodedToken = decodedToken;
                next();
            }
        });
    } else {
        res.status(401).json({ message: "You're not authorized" });
    }
};

module.exports = protected;