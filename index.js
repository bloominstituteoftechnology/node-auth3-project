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
        departments: ['sales', 'development']
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

function checkDepartment(department) {
    return function(req, res, next) {
        if (req.decodedToken && req.decodedToken.departments.includes(department)){
            next
        } else {
            res.status(403).json({ message: 'access denied' })
        }
    }
}

//Check server

server.get('/', (req, res) => {
    res.send('server is running');
})

//List of users only accessed by employees in development

server.get('/api/users', protected, checkDepartment('development'), (req, res) => {
    db('users')
    .select('id', 'username', 'password')
    .then(users => {
        res.json(users)
    })
    .catch(err => res.send(err))
})

//Register

server.post('/api/register', (req, res) => {
    const creds = req.body;
    const hash = bcrypt.hashSync(creds.password, 2);
    creds.password = hash;
    db('users')
    .insert(creds)
    .then(ids => {
        res.status(201).json(ids);
    })
    .catch(err => res.status(500).json(ids))
})

//Login

server.post('/api/login', (req, res) => {
    const creds = req.body;
    db('users')
    .where({ username: creds.username })
    .first()
    .then(user => {
        if (user && bcrypt.compareSync(creds.password, user.password)) {
            const token = generateToken(user);
            res.status(200).json({ message: 'welcome', token })
        } else {
            res.status(401).json({ message: 'login failed' })
        }
    })
    .catch(err => res.json(err))
})


server.listen(3300, () => console.log('server is running on port 3300'));