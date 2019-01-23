const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors')

// server requirements
const server = express();
const db = require('./data/dbHelpers.js');
const PORT = 2323;

server.use(express.json());
server.use(cors());

// secret hardcoded
const secret = 'i am def not telling anyone';

// token generator
const generateToken = (username) => {
    const payload = {
        username
    };
    const options = {
        expiresIn: '1d',
        jwtid: '1993'
    };
    return jwt.sign(payload, secret, options);
}

// protect mw
const protect = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                res.status(401).send('invalid token')
            } else {
                next();
            }
        })
    } else {
        res.status(401).send('no token provided')
    }
}

// endpoints

// REGISTER POST:
server.post('/api/register', (req, res) => {
    const creds = req.body;
    if (creds.username && creds.password) {
        creds.password = bcrypt.hashSync(creds.password, 12);
        db.insert(creds)
            .then(ids => {
                const id = ids[0];
                const token = generateToken(creds.username);
                res.status(201).json({ id, token });
            })
            .catch(err => {
                res.status(500).json({ error: "Could not register a new user." });
            })
    } else {
        res.status(400).json({ error: "Please provide a username and a password." })
    }
});

// LOG IN POST:
server.post('/api/login', (req, res) => {
    const creds = req.body;
    db.findByUsername(creds.username)
        .then(user => {
            if (user.length && bcrypt.compareSync(creds.password, user[0].password)) {
                const token = generateToken(creds.username);
                res.json({ token });
            } else {
                res.status(201).json({ error: "Wrong username or password" });
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'Failed to log in' });
        });
});

// GET:
server.get('/api/users', protect, (req, res) => {
    db.findUsers()
        .then((users) => {
            res.json(users);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

server.listen(PORT, () => {
    console.log(`\n=== Web API listening on http://localhost:${PORT} ===\n`);
});