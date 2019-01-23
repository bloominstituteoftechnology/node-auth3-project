const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./data/dbHelpers.js');

const server = express();

const secret = 'IHazASecret';
const PORT = 4500;
server.use(express.json());
server.use(cors());

function generateToken(user) {
    const payload = {
        username: user.username,
        department: user.department
    };

    const options = {
        expiresIn: '10000',
        jwtid: '7562248',
    };
    return jwt.sign(payload, secret, options);
};

function protectThis (req, res, next) {
    const token = req.headers.authorization;
    if(token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if(err) {
                res.status9401.json({ errMessage: 'Invalid Token' });
            }
            else {
                req.username = decodedToken.username;
                next();
            }
        });
    }
    else {
        res.status(401).json({ errMessage: 'No Token Provided.' });
    }
};

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});