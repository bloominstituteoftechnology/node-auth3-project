const express = require('express');
const knex = require('knex');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const dbConfig = require('./knexfile');
const db = knex(dbConfig.development);

const server = express();

server.use(express.json());

function generateToken(username) {
    const payload = {
        username,
    };

    const secret = 'The meaning of life is 42';

    const options = {
        expiresIn: '1h',
        jwtid: '12345' 
    };

    return jwt.sign(payload, secret, options)
}

server.get('/', (req, res) => {
    res.send('API Running...');
});

server.post('/api/register', (req, res) => {
    const credentials = req.body;

    const hash = bcrypt.hashSync(credentials.password, 3);

    credentials.password = hash;

    db('users').insert(credentials).then(ids => {
        const id = ids[0];

        db('users')
            .where({id})
            .first()
            .then(user => {
                const token = generateToken(user);
                res.status(201).json({id: user.id, token });
            })
            .catch(err => res.status(500).send(err));
    }).catch(err => res.status(500).send(err));
});

server.get('/api/users', (req, res) => {
        db('users')
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => res.status(500).send(err));
});

server.listen(8000);