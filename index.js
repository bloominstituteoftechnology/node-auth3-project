const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = require('./data/dbConfig');

const server = express();
const PORT = 4200;

const secret = "SuperCaliFragilisticExpialadocious8675309"; //heh, two fun old references here! :-)

function protect(req, res, next) {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                res
                    .status(401)
                    .json({ message: "nope" });
            } else {
                next();
            }
        });
    } else {
        res
            .status(401)
            .json({ message: "no token?" });
    }
}

function makeToken(user) {
    const payload = {
        username: user.username
    };
    const options = {
        expiresIn: "42mins",
        jwtid: "8675309"
    };
    return jwt.sign(payload, secret, options);
}

server.get('/', (req, res) => {
    res.send("it works!");
});

server.listen(PORT, () => {
    console.log(`working so far, on port ${PORT}`);
});