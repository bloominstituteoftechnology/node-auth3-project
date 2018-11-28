require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const bcrypt = require('bcrypt')
const db = require('./database/config.js')
const jwt = require('jsonwebtoken');

const server = express()

server.use(express.json())
server.use(cors())
server.use(helmet())
server.use(restricted)

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        departments: ['engineering', 'quality assurance', 'animation'],
    };
  
    const secret = process.env.JWT_SECRET;
    const options = {
        expiresIn: '1h',
    };
  
    return jwt.sign(payload, secret, options);
}

function restricted(req, res, next) {
    const token = req.headers.authorization
    if (req.url.includes('/api/restricted')) {
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
                if (err) {
                    res.status(401).json({ message: 'invalid token' })
                } else {
                    req.decodedToken = decodedToken
                    next()
                }
            })
        } else {
            res.status(401).json({ message: 'please vacate the premises' })
        }
    } else {
        next()
    }
}

function checkDept(dept) {
    return function(req, res, next) {
        if (req.decodedToken && req.decodedToken.departments.includes(dept)) {
            next()
        } else {
            res.status(403).json({ message: 'forbidded' })
        }
    }
}

server.post('/api/register', (req, res) => {
    const creds = req.body
    const hash = bcrypt.hashSync(creds.password, 10)
    creds.password = hash
    db('users')
        .insert(creds)
        .then(ids => res.status(201).json(ids))
        .catch(err => res.status(500).json(err))
})

server.post('/api/login', (req, res) => {
    const creds = req.body
    db('users')
        .where({ username: creds.username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(creds.password, user.password)) {
                const token = generateToken(user)
                res.status(200).json({ message: 'login successful!', token })
            }
            else {
                res.status(401).json({ message: 'try again chief' })
            }
        })
        .catch(err => res.json(err))
})

server.get('/api/restricted/users', (req, res) => {
    db('users')
    .select('id', 'username')
    .then(users => res.json(users))
    .catch(err => res.send(err))
})

server.listen(9000, () => console.log('\n servin up on port 9000\n'));
