require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('../database/dbConfig.js');

const router = express.Router();

const protected = require('../middleware/middleware.js');

// token creation 

const jwtSecret = process.env.jwtSecret;
function generateToken(user) {
    const jwtPayload = {
        subject: user.id,
        hello: 'fsw14',
        roles: 'user'
    };
    const jwtOptions = {
        expiresIn: '1m',
    }
    return jwt.sign(jwtPayload, jwtSecret, jwtOptions)
};

// post

router.post('/login', (req, res) => {
    const creds = req.body;
    db('users')
        .where({ username: creds.username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(creds.password, user.password)) {
                const token = generateToken(user);
                res.status(200).json({ welcome: user.username, token })
            } else {
                res.status(401).json({ message: 'nope' })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        });
});

//post register new user

router.post('/register', (req, res) => {
    const creds = req.body;
    const hash = bcrypt.hashSync(creds.password, 14);
    creds.password = hash;
    db('users')
        .insert(creds)
        .then(ids => {
            const id = ids[0];
            res.status(201).json(ids);
        })
        .catch(err =>
            res.status(500).json({ message: 'unable to join' }))
});

// get

router.get('/users', protected, (req, res) => {
    db('users')
        .select('id', 'username')
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.json(err);
        })
});
module.exports = router;