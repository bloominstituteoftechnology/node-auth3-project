require('dotenv').config();

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if(token) {
        jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
            if(err) {
                res.status(401).json({ message: 'Problem With Authentication' })
            } else {
                next();
            }            
        })
    } else {
        res.status(401).json({ message: 'Invalid Credentials' });
    }
}