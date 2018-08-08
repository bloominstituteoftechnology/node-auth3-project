const express = require('express');
const db = require('../data/db');const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();



function protected(req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({error: 'you shall not pass!! - token invalid'})
            }

            req.jwToken = decodedToken;
            next();
        })
    } else {
        return res.status(401).json({error: 'Incorrect credentials'})
    }
}

router.get('/', protected, (req, res) => {

    db('users').then(user => {
        if(user) {
        res.status(201).json(user);
        } else {
            res.status(400).json({err: 'You shall not pass'})
        }
    })
})

module.exports = router;