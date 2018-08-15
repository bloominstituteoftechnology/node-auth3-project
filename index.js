const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./data/db');
const port = 8000;

const server = express();

server.use(express.json());


server.post('/register', (req, res) => {
    const user = req.body;

    const hash = bcrypt.hashSync(user.password, 14);
    user.password = hash;

    db('users')
        .insert(user)
        .then( ids => {
            db('users')
                .where({ id: ids[0]})
                .first()
                .then( user => {
                    res.status(201).json(user);
                })
        })
        .catch(err => res.status(500).json(err))
});

server.post('/login', (req, res) => {
    const credentials = req.body;

    db('users')
        .where({ username: credentials.username })
        .first()
        .then(user => {
            res.status(200).json(`Success! ${user.name} is logged in`)
        })
        .catch(err => res.status(500).json(err))
});

server.get('/users', (req, res) => {
    db('users')
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => res.status(500).json(err))
})


server.listen(port, () => console.log(`\n==== API is running on port ${port} ====\n`));