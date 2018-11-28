require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./data/dbconfig.js');

const server = express();

server.use(express.json());
server.use(cors());

const generateToken = user => {
    const payload = {
        userId = user.id,
        username = user.username,
        role = user.role,
    }
    const secret = process.env.LAMBDA_SECRET;
    const options = {
        expiresIn: '1d',
    }
    return jwt.sign(payload, secret, options);
};

const protected = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, process.env.LAMBDA_SECRET, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message: 'Invalid token.' });
            } else {
                req.decodedToken = decodedToken;
                next();
            }
        })
    }
};