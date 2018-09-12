const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const sessions = require('express-session');
const jwt = require('jsonwebtoken');

const dbConfig = require('./knexfile');

const db = knex(dbConfig.development);

const server = express();

server.use(helmet());
server.use(express.json()); // don't forget this
server.use(cors());

const secret = 'buy more cheese';

function generateToken(user) {
    const payload = {
        username: user.username,
    };
    const options = {
        expiresIn: '1h',
        jwtid: '12345',
    };
    return jwt.sign(payload,secret,options);
}

server.post('/api/register', (req,res) => {
    const creds = req.body;
    const hash = bcrypt.hashSync(creds.password, 10);
    creds.password = hash;
    db('users')
    .insert(creds)
    .then(ids => {
        const id = ids[0];

        db('users')
        .where({id})
        .first()
        .then(user => {
            const token = generateToken(user);
            res.status(201).json({ id: user.id, token});
        })
        .catch(err => res.status(500).send(err));
    })
    .catch(err => res.status(500).send(err));
});

function protected(req,res,next) {
}


//start server
server.get('/', (req, res) => {
res.send('API Running...');
});



server.listen(9000);