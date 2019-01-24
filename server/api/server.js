require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const knex = require('knex');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const middleware = require('../middleware/main');

const knexConfig = require('../knexfile');

const server = express();

const db = knex(knexConfig.development);

server.use(morgan('combined'));
server.use(cors());
server.use(helmet());
server.use(express.json());

server.post('/api/register/', (req, res) => {
    const userInfo = req.body;
    const hash = bcrypt.hashSync(userInfo.password, 12);
    userInfo.password = hash;

    db('users')
        .insert(userInfo)
        .then(ids => {
            res.status(201).json(ids);
        })
        .catch(err => res.status(500).json(err));
});

generateToken = user => {
    const payload = {
        username: user.name,
        roles: ['root'],
    };

    const secret = process.env.JWT_SECRET;

    const options = {
        expiresIn: '1m',
    };

    return jwt.sign(payload, secret, options);
};

server.post('/api/login/', (req, res) => {
    const creds = req.body;
    db('users')
        .where({ username: creds.username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(creds.password, user.password)) {
                const token = generateToken(user);
                res.status(200).json({
                    message: 'Successfully authenticated',
                    token,
                });
            } else {
                res.status(401).json({
                    error: 'Username or password it incorrect',
                });
            }
        })
        .catch(err => res.status(500).json(err));
});

server.get('/api/users', middleware.auth, (req, res) => {
    db('users')
        .select('id', 'username')
        .then(users => {
            res.status(200).json({
                users,
                decodedToken: req.decodedToken,
            });
        });
});

module.exports = server;
