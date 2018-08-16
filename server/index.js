const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./data/db');
const port = 8000;

const server = express();

server.use(express.json());


protected = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                return res.status(404).json({ error: 'You shall not pass! - token invalid' })
            }
            req.jwtToken = decodedToken;
            next();
        })
    } else {
        return res.status(401).json({ error: 'You shall not pass! - no token' })
    }
}

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
                    const token = generateToken(user);
                    res.status(201).json(token);
                })
        })
        .catch(err => res.status(500).json(err))
});

const secret = 'my name is Katie.';

generateToken = (user) => {
    const payload = {
        username: user.username,
    };
    const options = {
        expiresIn: "1h",
    };
    return jwt.sign(payload, secret, options);
}

server.post('/login', (req, res) => {
    const credentials = req.body;

    db('users')
        .where({ username: credentials.username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(credentials.password, user.password)) {
                const token = generateToken(user);
                res.status(200).json(token);
            } else {
                return res.status(401).json({ error: 'incorrect user credentials' })
            }
        })
        .catch(err => res.status(500).json(err))
});

server.get('/users', protected, (req, res) => {
    db('users')
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => res.status(500).json(err))
})

// server.get('/logout', (req, res) => {
//     if (req.sess) {
//         req.session.
//     }
// })


server.listen(port, () => console.log(`\n==== API is running on port ${port} ====\n`));