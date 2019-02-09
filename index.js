const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const jwt = require('jsonwebtoken');

const db = require('./data/dbHelpers.js');

const server = express();

server.use(express.json());
server.use(cors());

function generateToken(user) {
    const payload = {
        username: user.username,
        department: user.department
    };

    const secret = 'secretsecretsarenofunsecretsecretshurtsomeone';

    const option = {
        expiresIn: '1h',
        jwtid: '54321'
    };

    return jwt.sign(payload, secret, option);
}

function protected(req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, secret, (error, decodedToken) => {
            if (error) {
                res.status(401).json({ message: 'Invalid token!' });
            } else {
                next();
            }
        })
    } else {
        res.status(401).json({ message: 'You shall not pass!' })
    }
};

const PORT = 5500;

server.post('/api/register', (req, res) => {
    const user = req.body;

    if (user.username && user.department) {
        user.password = bcrypt.hashSync(user.password, 14);
        db.insertUser(user)
            .then(([id]) => {
                res.status(201).json({ id });
            })
            .catch(err => {
                res.status(500).json(err);
            })
    } else {
        res.status(400).json({ message: 'Must have username and department' })
    }
});

server.post('/api/login', (req, res) => {
    const user = req.body;
    db.findUser(user.username)
        .then(users => {
            if (users.length && bcrypt.compareSync(user.password, users[0].password)) {
                const token = generateToken(user);
                res.status(200).json('Logged in!')
            } else {
                res.status(404).json({ err: 'Credentials are invalid' })
            }
        })
        .catch(err => {
            res.status(500).json(err);
        })
});

server.get('/api/users', protected, (req, res) => {
    db.getUsers()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.status(500).send(err)
        });
});

server.listen(PORT, console.log(`Now listen on port ${PORT}`));