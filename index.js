const express = require('express');
const cors = require('cors');

const bcrypt = require('bcryptjs');

const db = require('./database/dbConfig.js');

const server = express();

const jwt = require('jsonwebtoken');

server.use(express.json());
server.use(cors());

// sanity check
server.get('/', (req, res) => {
    res.send("It's allliiiiive!!");
});

server.post('/api/register', (req, res) => {
    const credentials = req.body;

    // hash password
    const hash = bcrypt.hashSync(credentials.password, 14);
    credentials.password = hash;
    // save user
    db('users').insert(credentials).then(ids => {
        const id = ids[0];
        res.status(201).json({ newUserId: id });
    })
    .catch(err => {
        res.status(500).json({err});
    })
})

function generateToken(user) {

    const jwtPayload = {
        ...user,
    };

    const jwtSecret = 'nobody tosses a dwarf!';

    const jwtOptions = {
        expiresIn: '1h'
    }

    return jwt.sign(jwtPayload, jwtSecret, jwtOptions)
}

function protected(req, res, next) {
    const token = req.headers.authorization;

    if (token) {

    } else {

    }
}

const port = 8989;
server.listen(port, () => console.log(`***API running on ${port}***`))