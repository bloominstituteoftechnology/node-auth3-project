const knex = require('knex');
const knexConfig = require('../knexfile');
const jwt = require('jsonwebtoken');

protect = (req, res, next) => {
    console.log(req.headers.authorization)
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                res
                    .status(401)
                    .json({
                        message: "nope"
                    })
            } else {
                next();
            }
        })
    } else {
        res
            .status(401)
            .json({
                message: 'missing token'
            });
    }
}


module.exports = {
    protect,
}