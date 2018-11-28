require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./database/dbConfig.js');
const server = express();

server.use(express.json());
server.use(cors());

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
    }
    const secret = process.env.JWT_SECRET;
    const options = {
        expiresIn: '1h'
    }
    return jwt.sign(payload, secret, options)
}

function protected(req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message: 'invalid token' })
            } else {
                req.decodedToken = decodedToken;
                next();
            }
        })
    } else {
        res.status(401).json({ message: 'no token provided' })
    }
}

server.get('/', (req, res) => {
    res.send('server is running');
})

server.get('/api/users', protected, (req, res) => {
    db('users')
    .select('id', 'username', 'password')
    .then(users => {
        res.json(users)
    })
    .catch(err => res.send(err))
})



server.listen(3300, () => console.log('server is running on port 3300'));