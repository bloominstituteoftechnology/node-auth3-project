require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const db = require('./database/dbConfig');
const server = express();



server.use(express.json());
server.use(cors());


server.post('/api/register', (req, res) => {
    const creds = req.body;

    if(!creds.username || !creds.password) {
        res.status(422).json({message: 'username and password both required'});
        return;
    }
    
    const hash = bcrypt.hashSync(creds.password, 8);
    creds.password = hash;
    console.log(creds);
    db('users')
        .insert(creds)
        .then(ids => {
            res.status(201).json({ids})
        })
        .catch(err => res.json(err));
});

server.post('/api/login', (req, res) => {

});

server.get('/api/users', (req, res) => {

});

server.listen(3300, () => console.log('\nServer listening on port 3300\n'))
