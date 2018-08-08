const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = require('./data/db');

const server = express();

const secret = 'nobody tosses a dwarf'

function generateToken(user) {
    const payload = {
        username: user.username,
    };
    const options = {
        expriesIn: '1h',
        jwtid: '8728391',
    };
    return jwt.sign(payload, secret, options);
}

function protected(req, res, next) {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                return res 
                    .status(401)
                    .json({ error: 'You shall not pass!! - token invalid' });
            }
            req.jwtToken = decodedToken;
            next();
        });
    } else {
        return res.status(401).json({ error: 'you shall not pass!! - no token' });
    }
}

const port = 8000;
server.listen(port, () => console.log(`\n=== API running on ${port} ===\n`)); 