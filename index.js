const express = require('express');
const bcrypt = require('bcryptjs');
const knex = require('knex');
const helmet = require('helmet');
const jwt = require('jsonwebtoken');

const db = require('./db/helpers')
const server = express();

server.use(express.json());
server.use(helmet());

server.get('/', (req, res) => {
    res.status(200).json('working');
});

function getToken(user) {
    const payload = {
        username: user.username
    };
    const secret = 'Not a Secret';
    const options = {
        expiresIn: '1h',
        jwtid: '12345'
    };
    return jwt.sign(payload, secret, options);
}

server.get('/greet', (req, res) => {
    res.send('hello name')
})

server.post('/api/register', (req, res) => {
    let creds = req.body;
    creds.password = bcrypt.hashSync(creds.password, 5);

    db.registerUser(creds)
        .then((ids) => {
            db('users')
                .where({ ids })
                .first()
                .then(user => {
                    const token = getToken(creds.username);
                    res.status(201).json({ id: user.id, token });
                })
                .catch(err => res.status(500).send(err));
        })
        .catch(err => res.status(500).json('Invalid'));
});

server.post('/api/login', (req, res) => {
    let creds = req.body;

    db.loginUser(creds)
        .then((user) => {
            if (user && bcrypt.compareSync(creds.password, user.password)) {
                req.name = creds.username;
                res.status(200).json({ message: `welcome ${creds.username}` });
            } else {
                res.status(401).json({ message: 'Your username and/or password is invalid' });
            }
        })
        .catch(err => res.status(500).send(err));
});

server.get('/api/users', (req, res) => {
    db.getUsers()
        .then((users) => {
            res.status(200).json(users);
        })
        .catch(err =>
            res.status(404).json({ message: 'Could not find users database' }))
});

const port = 8000
server.listen(port, console.log(`\n ===> Server is running on port ${port} <=== \n`))