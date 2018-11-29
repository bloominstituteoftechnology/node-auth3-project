// enable .env usage
require('dotenv').config();

// imports
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs')
const logger = require('morgan');
const db = require('./database/config.js');
const jwt = require('jsonwebtoken');

// server + middleware
const server = express();
server.use(express.json());
server.use(cors());
server.use(logger('dev'));

// create a token
function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        role: user.department
    }
    const secret = process.env.JWT_SECRET;
    const options = {
        expiresIn: '10m',
    }

    return jwt.sign(payload, secret, options);
}

// authenticate the user
function authenticate(req, res, next) {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                res.status(401).json({message: "your token is invalid"})
            } else {
                req.decodedToken = decodedToken;
                next();
            }
        })
    } else {
        res.status(401).json({message: "no token provided"});
    }
}

// API status ------------------------------------------------------------------------------------------------------------------------------
server.get('/', (req, res) => res.send({API: "live"}))

// sign up endpoint ------------------------------------------------------------------------------------------------------------------------
server.post('/api/register', (req, res) => {
    const creds = req.body;
    const hash = bcrypt.hashSync(creds.password, 5)
    creds.password = hash;

    db('users')
        .insert(creds)
        .then(ids => {
            res.status(201).json(ids);
        })
        .catch(err => {
            res.send(err);
        })
})

// log in endpoint -------------------------------------------------------------------------------------------------------------------------
server.post('/api/login', (req, res) => {
    const creds = req.body;
    db('users')
        .where({username: creds.username})
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(creds.password, user.password)) {
                const token = generateToken(user);
                res.status(200).json({message: "Logged in", token});
            } else {
                res.status(401).json({message: "You shall not pass!"});
            }
        })
        .catch(err => res.send(err));
})

// get users endpoint ----------------------------------------------------------------------------------------------------------------------
// make sure you copy the token from the login POST into the GET headers
server.get('/api/users', authenticate, (req, res) => {
    db('users')
        .select('id', 'username', 'department')
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => res.send(err));
})


// server listening on dynamic port
const port = process.env.PORT || 9000;
server.listen(port, () => console.log(`Server listening on ${port}`));