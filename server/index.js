require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./data/dbconfig.js');

const server = express();

server.use(express.json());
server.use(cors());

const generateToken = (user) => {
    const payload = {
        userId: user.id,
        username: user.username,
        department: user.department,
    }
    const secret = process.env.LAMBDA_SECRET;
    const options = {
        expiresIn: '1d',
    }
    return jwt.sign(payload, secret, options);
};

const protected = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, process.env.LAMBDA_SECRET, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message: 'Invalid token.' });
            } else {
                req.decodedToken = decodedToken;
                next();
            }
        })
    } else {
        res.status(401).json({ message: 'You are not authorized.' });
    }
};

server.post('/api/register', (req, res) => {
    const creds = req.body;
    const hash = bcrypt.hashSync(creds.password, 14);
    creds.password = hash;
    db('users')
        .insert(creds)
        .then(ids => {
            const token = generateToken(creds);
            res.status(201).json({ ids, token });
        })
        .catch(err => {
            res.status(500).json({ error: 'Registration error.', err });
        });
});

server.post('/api/login', (req, res) => {
    const creds = req.body;
    db('users')
        .where({ username: creds.username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(creds.password, user.password)) {
                const token = generateToken(user);
                res.status(200).json({ message: `Welcome ${user.username}`, token });
            } else {
                res.status(401).json({ message: 'Wrong username or password' });
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'There was an error logging in.', err });
        });
});

server.get('/api/users', protected, (req, res) => {
    db('users')
        .select('id', 'username', 'password', 'department')
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({ error: 'There was an error fetching the data.', err });
        });
});

server.listen(3300, () => console.log('\nServer is listening on port 3000\n'));