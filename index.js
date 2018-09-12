// require statements for NPM packages
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// pull in database
const db = require('./database/dbConfig');

// create a server instance using express
const server = express();

// middleware
server.use(express.json());
server.use(cors());

// JSON web token secret
const secret = 'the cake is a lie';

// function to generate a JSON web token
function generateToken(user) {
    const payload = {
        username: user.username
    };
    const options = {
        expiresIn: '1h',
        jwtid: '1234567890'
    };
    return jwt.sign(payload, secret, options)
}

// endpoints