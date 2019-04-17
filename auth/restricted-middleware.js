const jwt = require('jsonwebtoken');

const secrets = require('../config/secrets.js');

module.exports = (req, res, next) => {
    const token = req.headers.authorization

    if(token) {
        jwt.verify(token, secrets.jwtSecret, (err, decodeToken) => {
            if(err) {
                res.status(401).json({ You: 'can\'t do that!' })
            } else {
                req.decodeJwt = decodeToken
                console.log('decode token', req.decodeJwt)
                next()
            }
        })
    } else {
        res.status(401).json({ You: 'Can\'t pass!' })
    }
}