const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./database/dbConfing.js');

const server = express();

server.use(express.json());
server.use(cors());

server.post('/api/register', (req, res) => {
    // get username and passowrd from body
    const creds = req.body;

    // generate hash from user password
    const hash = bcrypt.hashSync(creds.password, 14);

    // override the user.pasword with the hash
    creds.password = hash;

    // save the user to the database
    db('users')
        .insert(creds)
        .then(ids => {
            res.status(201).json(ids);
        })
        .catch(err => {
            res.status(401).json({message: err})
        })
});


server.get('/', (req, res) => {
    res.send('server is working')
});

server.listen(9000, ()=> console.log('\nrunning on port 9000\n'))