const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./database/dbConfig.js');

const server = express();

server.use(express.json());
server.use(cors());

const secret = 'my voice is my passport';

function conjureToken(user) {
    const payload = {
        username: user.username,
    };
    const options = {
        expiresIn: '2h',
        jwtid: '222', // jti
        subject: `${user.id}`,
    };
    return jwt.sign(payload, secret, options);
}

// Endpoints 
server.get('/', (req, res) => {
    res.send('Server online');
});

server.post('/api/register', (req, res) => {
    const creds = req.body;

    const hash = bcrypt.hashSync(creds.password, 11);
    // replace user's password with the hash
    creds.password = hash;
    db('users')
        .insert(creds)
        .then(ids => {
            const id = ids[0];

            db('users')
                .where({ id })
                .first()
                .then(user => {
                    const token = conjureToken(user);
                    res.status(201).json({ id: user.id, token });
                })
                .catch(err => res.status(500).send(err));
        })
        .catch(err => res.status(500).send(err));
});

server.post('/api/login', (req, res) => {
    
})


server.listen(3900, () => console.log('\nrunning on port 3900\n'));