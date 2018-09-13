const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./database/dbConfig.js');

const server = express();

server.use(express.json());
server.use(cors());

const secret = 'seecreeettt';

function generateToken(user) {
    const payload = {
        username: user.username,
    };
    const options = {
        expiresIn: '1h',
        jwtid: '12345', // jti
    };
    return jwt.sign(payload, secret, options);
}

server.post('/api/register', (req, res) => {
    const creds = req.body;
    const hash = bcrypt.hashSync(creds.password, 10);
    creds.password = hash;
    db('users')
        .insert(creds)
        .then(ids => {
            const id = ids[0];

            db('users')
                .where({ id })
                .first()
                .then(user => {
                    const token = generateToken(user);
                    res.status(201).json({ id: user.id, token });
                })
                .catch(err => res.status(500).send(err));
        })
        .catch(err => res.status(500).send(err));
});

function protected(req, res, next) {
    // use jwts instead of sessions
    // read the token string from the Authorization header
    const token = req.headers.authorization;

    if (token) {
        // verify the token
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                // token is invalid
                res.status(401).json({ message: 'Invalid Token' });
            } else {
                // token is valid
                console.log(decodedToken);
                req.user = { username: decodedToken.username };

                next();
            }
        });
    } else {
        res.status(401).json({ message: 'no token provided' });
    }
}

server.post('/api/login', (req, res) => {
    const creds = req.body;

    db('users')
        .where({ username: creds.username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(creds.password, user.password)) {
                const token = generateToken(user);

                res.status(200).json({ token });
            } else {
                res.status(401).json({ message: 'You shall not pass!' });
            }
        })
        .catch(err => res.status(500).send(err));
});

// protect this route, only authenticated users should see it
server.get('/api/users', protected, (req, res) => {
    if (req.user.roles.includes('admin')) {
    }
    db('users')
        .select('id', 'username', 'password')
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send(err));
});

server.get('/', (req, res) => {
    res.send('Its Alive!');
});

server.listen(3300, () => console.log('\nrunning on port 3300\n'));