// dependencies
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// databse
const db = require('./data/dbConfig.js');
// express
const server = express();
// middleware
server.use(express.json());

// endpoints
server.post('/api/register', (req, res) => {
    const credentials = req.body;
    const hash = bcrypt.hashSync(credentials.password, 14);
    credentials.password = hash;

    db('users')
        .insert(credentials)
            .then(ids => {
                const id = ids[0];
                console.log('from', id);
                res.status(200).json({ newUserId: id });
            })
            .catch(err => {
                console.log('register post error');
                res.status(500).json(err);
            });
});

server.post('/api/login', (req, res) => {
    const credentials = req.body;
    console.log(credentials)
    db('users')
        .where({ username: credentials.username })
        .first()
            .then(user => {
                if(user && bcrypt.compareSync(credentials.password, user.password)) {
                    console.log(user);
                    const token = generateToken(user);
                    console.log(token);
                    res.status(200).json({ welcome: user.username, token });
                } else {
                    res.status(400).json({ message: 'you shall not pass!' });
                }
            })
            .catch(err => {
                res.status(500).json(err);
            });
});

const jwtSecret = 'nobody tosses a dwarf';

function generateToken(user) {
    const jwtPayload = {
        ...user,
        hello: 'FSW13',
        role: 'admin'
    }

    const jwtOptions = {
        expiresIn: '1m'
    }

    return jwt.sign (jwtPayload, jwtSecret, jwtOptions)
}

server.get('/api/users', protected, (req, res) => {
    console.log('\n** decoded token information ** \n', req.codedToken);
    db('users')
        .select('id', 'username', 'password', 'department')
            .then(users => {
                res.status(200).json(users);
            })
            .catch(err => {
                res.status(200).json(err);
            });
});

function protected(req, res, next) {
    const token = req.headers.authorization;

    if(token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            (err) ?
            // token verification error
            res.status(401).json({ message: 'invalid token' })
            :
            // token valid
            req.decodedToken = decodedToken;
            next();
        })
    } else {
        res.status(401).json({ message: 'no token provided' });
    }
}

// port
const port = 7000;
server.listen(port, () => console.log(`___ server listening at localhost ${port} ___`));