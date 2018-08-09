const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./data/db')

const server = express();

server.use(express.json());
server.use(morgan('dev'));
server.use(helmet());

const secret = 'nobody tosses a dwarf!';

function generateToken(user) {
    const payload = {
        username: user.username,
    };

    const options = {
        expiresIn: '24h',
        jwtid: '8728391',
    };

    return jwt.sign(payload, secret, options);
}

function protected(req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                return res
                    .status(401)
                    .json({ error: 'you shall not pass!! - token invalid' });
            }

            req.jwtToken = decodedToken;
            next();
        });
    } else {
        return res.status(401).json({ error: 'you shall not pass!! - no token' });
    }

    // if (req.session && req.session.username === 'thomas') {
    //   next();
    // } else {
    //   return res.status(401).json({ error: 'Incorrect credentials' });
    // }
}

server.post('/api/register', (req, res) => {
    const user = req.body

    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    db('users')
        .insert(user)
        .then(ids => {
            db('users')
                .where({ id: ids[0] })
                .first()
                .then(user => {
                    const token = generateToken(user);
                    res.status(201).json(token)
                })
        })
        .catch(err => {
            res.status(500).json({ err })
        })

    server.post('/api/login', (req, res) => {
        const credentials = req.body;

        db('users')
            .where({ username: credentials.username })
            .first()
            .then(function (user) {
                if (user && bcrypt.compareSync(credentials.password, user.password)) {
                    // generate the token
                    const token = generateToken(user);

                    // req.session.username = user.username;

                    // attach token to the response
                    res.send(token);
                } else {
                    return res.status(401).json({ error: 'Incorrect credentials' });
                }
            })
            .catch(function (error) {
                res.status(500).json({ error });
            });
    });
})


server.get('/api/users', protected, (req, res) => {
    console.log('token', req.jwtToken);

    db('users')
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send(err));
});

server.listen(8000, () => console.log('API running on port 8000... *.*'));