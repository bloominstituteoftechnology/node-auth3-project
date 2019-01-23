require('dotenv').config();

const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.status(401).json({ message: 'This token is not valid' });
            } else {
                req.decodedToken = decodedToken;
                next();
            }
        });
    } else {
        res.status(401).json({ message: 'A token is required' });
    }
};

exports.checkRole = (req, res, next) => {
    return (req, res, next) => {
        if (req.decodedToken.roles.includes(role)) {
            next();
        } else {
            res.status(403).json({
                message: 'You are not authorized to access this resource.',
            });
        }
    };
};
