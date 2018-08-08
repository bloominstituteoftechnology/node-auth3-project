const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const port = 8002;

const db = require('./data/db');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('<h1>Home Page</h1>')
})
// **** user *****

server.post('/api/register', function(req, res) {
    const user = req.body;

    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    db('users')
        .insert(user)
        .then(function(ids) {
            db('users')
            .where({ id: ids[0] })
            .first()
            .then(user => {
                const token = generateToken(user);
                res.status(201).json(token);
            })
        })
        .catch(err => res.status(500).json({ err }))

})

const secret = 'nobody tosses a dwarf!!';

function generateToken(user) {
    const payload = {
        username: user.username,
    }

    const options = {
        expiresIn: '1h',
        jwtid: '2345678'
    };

    return jwt.sign(payload, secret, options)
}

server.listen(port, () => console.log(`running on port ${port}`));