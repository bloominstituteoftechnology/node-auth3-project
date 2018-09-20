const express = require('express');
const bcrypt = require('bcryptjs');
const helmet = require('helmet');
const knex = require('knex');
const jwt = require('jsonwebtoken');

const dbConfig = require('./knexfile');
const db = knex(dbConfig.development);
const server = express();

server.use(express.json());
server.use(helmet());

server.get('/', (req, res) => {
    res.status(200).json('working');
});
const secret = 'Not a Secret';

function getToken(user) {
    const payload = {
        username: user.username
    };
    const options = {
        expiresIn: '1h',
        jwtid: '12345'
    };
    return jwt.sign(payload, secret, options);
}

function protected(req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message: 'Invalid Token' });
            } else {
                req.user = { username: decodedToken.username };

                next();
            }
        });
    } else {
        res.status(401).json({ message: 'no token found' });
    }
}

server.get('/greet', (req, res) => {
    res.send('hello name')
})

server.post('/api/register', (req, res) => {
    const creds = req.body;
    creds.password = bcrypt.hashSync(creds.password, 5);

    db('users')
        .insert(creds)
        .then(ids => {
            const id = ids[0];
            db('users')
                .where({ id })
                .first()
                .then((user) => {
                    const token = getToken(user);
                    res.status(200).json({ id: user.id, token });
                })
                .catch(err => {
                    res.status(500).json('Users? What users?')
                })
                .catch(err => res.status(500).json('Invalid'));
        });

});

server.post('/api/login', (req, res) => {
    let creds = req.body;

    db('users')
        .where({ username: creds.username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(creds.password, user.password)) {
                const token = getToken(user);
                res.status(200).json({ token });
            } else {
                res.status(401).json({ message: 'Your username and/or password is invalid' });
            }
        })
        .catch(err => res.status(500).send(err));
});

server.get('/api/users', protected, (req, res) => {
    db('users')
        .then(user => {
            res.json(user);
        })
        .catch(err => res.send(err));
});

const port = 8000
server.listen(port, console.log(`\n ===> Server is running on port ${port} <=== \n`))