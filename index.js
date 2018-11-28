//Requires
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./database/dbConfig.js');
const server = express();
//Server.Use
server.use(express.json());
server.use(cors())

//  Generate Token
function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        department: user.department,
    };

    const secret = process.env.JWT_SECRET;
    const options = {
        expiresIn: '1h',
    };
    return jwt.sign(payload, secret, options);
}
//  PROTECTED FUNCTION
function protected(req, res, next) {
    const token = req.headers.authorization;

    if (token) {
    // is it valid
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
            res.status(401).json({ message: 'Invalid Token Provided' });
        } else {
            req.decodedToken = decodedToken;
            next();
        }
    });
} else {
    res.status(401).json({ message: 'Token Not Provided In Header' });
    }
}
//  LOGIN ENDPOINT
server.post('/api/login', (req, res) => {
    const creds = req.body;
    db('users')
    .where({ username: creds.username })
    .then(user => {
        if (user && bcrypt.compareSync(creds.password, user[0].password)) {
            const token = generateToken(user[0]);
            res.status(200).json({ message: `You are signed in ${creds.username}`, token });
        } else {
            res.status(401).json({ message: 'you shall not pass!!' });
        }
    })
    .catch(err => res.json({ERROR: err}));
});
//  GET USERS ENDPOINT
server.get('/api/users', protected, (req, res) => {
    db('users')
    .select('id', 'username','department','password')
    .then(users => {
        res.json(users);
    })
    .catch(err => res.send(err));
});
//  REGISTER ENDPOINT
server.post('/api/register', (req, res) => {
    const creds = req.body;
    const hash = bcrypt.hashSync(creds.password, 14);
    creds.password = hash;
    db('users')
        .insert(creds)
    .then(user => {
        res.status(201).json(user);
    })
    .catch(err => json(err));
});

server.listen(9000, () => console.log('\nrunning on port 9000\n'));

