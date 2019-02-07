const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const session = require('express-session');

const db = require('./data/dbHelpers.js');

const server = express();

server.use(express.json());
server.use(cors());

server.use(
    session({
        name: "session1",
        secret: "placeholder",
        cookie: {
            maxAge: 1 * 24 * 60 * 60 * 1000
        },
        httpOnly: true,
        resave: false,
        saveUninitialized: false
    })
);

const PORT = 5500;

server.post('/api/register', (req, res) => {
    const user = req.body;
    user.password = bcrypt.hashSync(user.password, 14);
    db.insertUser(user)
        .then(([id]) => {
            res.status(201).json({ id });
        })
        .catch(err => {
            res.status(500).json(err);
        })
});

server.post('/api/login', (req, res) => {
    const user = req.body;
    db.findUser(user.username)
        .then(users => {
            if (users.length && bcrypt.compareSync(user.password, users[0].password)) {
                req.session.userId = users[0].id;
                res.json('Logged in!')
            } else {
                res.status(404).json({ err: 'Credentials are invalid' })
            }
        })
        .catch(err => {
            res.status(500).json(err);
        })
});

server.get('/api/users', (req, res) => {
    if (req.session && req.session.userId) {
        db.getUsers()
            .then(users => {
                res.json(users)
            })
            .catch(err => {
                res.status(500).send(err)
            });
    } else {
        res.status(400).send('You shall not pass!')
    }
});

server.listen(PORT, console.log(`Now listen on port ${PORT}`));