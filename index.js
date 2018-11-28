require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const knex = require('knex');

const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(cors());

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        roles: ['lumber'],
    };

    const secret = process.env.JWT_SECRET;
    const options = {
        expiresIn: '1m',
    };

    return jwt.sign(payload, secret, options);
}

server.get('/api/users', (req, res) => {
    db('users')
        .select('id', 'username', 'department')
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => res.status(404).json({ message: 'users not found' }));
});

server.post('/api/register', (req, res) => {
    const creds = req.body;
    const hash = bcrypt.hashSync(creds.password, 4);
    creds.password = hash;

    db('users')
        .insert(creds)
        .then(ids => {
            res.status(201).json(ids);
        })
        .catch(err => res.status(404).json({ message: 'Could not register the user' }));
});

server.post('/api/login', (req, res) => {
    const creds = req.body;

    db('users')
        .where({ username: creds.username })
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(creds.password, user.password)) {
                const token = generateToken(user);
                res.status(200).json({ message: 'Logged In', token});
            } else {
                res.status(401).json({ message: 'Wrong username or password...'})
            }
        })
        .catch(err => res.status(404).json({ message: 'Failed to login'}));
})

server.listen(3300, () => console.log('\nrunning on port 3300\n'));