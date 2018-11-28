const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const knex = require('knex')
const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);
const server = express();

server.use(express.json());
server.use(cors());

const secret = 'jnafun89723urnasufnaunf98328432u4akfk'

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        roles: user.department
    }

    const options = {
        expiresIn: '1h'
    }

    return jwt.sign(payload, secret, options)
}

function protected(req, res, next) {
    const token = req.headers.authorization

    if(token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if(err) {
                res.status(401).json({ message: 'Access denied' })
            } else {
                req.decodedToken = decodedToken
                next();
            }
        })
    } else {
        res.status(401).json({ message: 'no token provided!' })
    }
}

//test end point
server.get('/', (req, res) => {
    res.send('im running!')
})

//registers a user
server.post('/api/register', (req, res) => {
    const creds = req.body

    //hash our password
    const hash = bcrypt.hashSync(creds.password, 14)
    creds.password = hash;

    //check for creds
    if(!creds.username || !creds.password || !creds.department) {
        res.status(404).json({ message: 'Please enter a username, password, and department' })
    } else {
    //save our user
    db('user')
        .insert(creds) 
        .then(ids => {
            const id = ids[0]
            res.status(201).json({ newUserId: id })
        })
        .catch(err => {
            res.status(500).json(err)
          })
        }
})

//logs in a user
server.post('/api/login', (req, res) => {
    const creds = req.body

    db('user')
        .where({ username: creds.username })
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(creds.password, user.password)) {
                const token = generateToken(user);
                res.status(200).json({ welcome: user.username, token })
            } else {
                res.status(401).json({ message: 'Error logging in' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Server error', err })
        })

})

//check registered users, no accesible by anyone not logged in
server.get('/api/users', protected, (req, res) => {
    db('user')
        .select('id', 'username', 'password', 'department')
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.send(err)
    })
})

server.listen(3300, () => console.log('running on port 3300'))