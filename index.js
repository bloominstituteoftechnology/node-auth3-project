const express = require('express')
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./data/dbConfig.js');

const server = express();
const PORT = 4040;

server.use(express.json(), cors());

const secret = `terces`;

function generateToken(user) {
    const payload = {
        username: user.username
    };
    const options = {
        expiresIn: '1h',
        jwtid: 'jwtid'
    };
    return jwt.sign(payload, secret, options);
};

server.post('/api/register', (req, res) => {
    const creds = req.body;
    const hash = bcrypt.hashSync(creds.password, 12);
    creds.password = hash;
    if (req.body.username && req.body.password && req.body.department) {
        db('users_table')
        .insert(creds)
        .then(ids => {
            const id = ids[0];
            db('users_table')
                .where('id', id)
                .then(user => {
                    const token = generateToken(user);
                    res
                        .status(201)
                        .json({subject: id, token});
                })
                .catch(err => {
                    res
                        .status(500)
                        .json({message: 'The user could not be registered at this time.'})
                })
        })
        .catch(err => {
            res
                .status(500)
                .json({message: 'The user could not be registered at this time.'})
        });
    }
    else {
        res
            .status(400)
            .json({message: 'Please provide a username, password, and department to register.'})
    }
});

server.listen(PORT, () => console.log(`Running on ${PORT}`));