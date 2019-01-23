const express = require('express')
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./data/dbConfig.js');

const server = express();
const PORT = 4040;

server.use(express.json(), cors());

const secret = `terces`;

function generateToken(user) {
    const payload = {
        username: user.username
    };
    const options = {
        expiresIn: '1h',
        // jwtid??
    };
    return jwt.sign(payload, secret, options);
};



server.listen(PORT, () => console.log(`Running on ${PORT}`));