const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./database/dbConfig');

const server = express();

server.use(express.json());
server.use(cors());

server.get('/', (req, res) =>{
    res.send('running')
})

server.post('/api/register', (req, res) =>{
    const creds = req.body;
    const hash = bcrypt.hashSync(creds.password, 10)
    creds.password = hash;
    db('users')
        .insert(creds)
        .then(ids => {
            const id = ids[0]
            res.status(201).json(id)
        }).catch(err=> res.status(500).send(err))
})

server.get('/api/users', (req, res) => {    
    db('users')
        .select('id', 'username')
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send(err));    
});

server.listen(3300, () => console.log('listening on port 3300'))
