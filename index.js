const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = knex(knexConfig.development);

const server = express();
const PORT = 5000;

server.use(express.json());

const secret = 'supersecret';

function generateToken(user) {
    const payload = {
        username: user.username,
        department: user.department
    };

    const options = {
        expiresIn: '1h',
        jwtid: '12345'
    };

    return jwt.sign(payload, secret, options)
};

function protect(req, res, next) {
    const token = req.headers.authorization;

    if(token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if(err) {
                res.status(401).json({message: 'invalid token'})
            } else {
                next();
            }
        })
    } else {
        res.status(401).json({message: 'no token provided'})
    }
};

server.post('/api/register', (req, res) => {
    const creds = req.body;
    creds.password = bcrypt.hashSync(creds.password, 10);
    db('users').insert(creds)
    .then(ids => {
        const id = ids[0];

        db('users').where({ id }).first()
        .then(user => {
            const token = generateToken(user);
            res.status(201).json({id: user.id, token})
        })
        .catch(err => {
            res.status(500).send(err)
        })
    })
    .catch(err => {
        res.status(500).json({message: 'error registering user'})
    })

})

server.post('/api/login', (req, res) => {
    const creds = req.body;

    db('users').where('username', creds.username)
    .then(userInfo => {
        if(userInfo.length && bcrypt.compareSync(creds.password, userInfo[0].password)) {
            const token = generateToken(userInfo);

            res.status(200).json({ token })
        } else {
            res.status(400).json({message: 'username or password incorrect'})
        }
    })
    .catch(err => {
        res.status(500).json({message: 'error logging in'})
    })

})

server.get('/api/users', (req, res) => {

})

server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})