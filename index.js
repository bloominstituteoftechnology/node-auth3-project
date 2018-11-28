const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const knex = require('knex')
const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);
const server = express();

server.use(express.json());
server.use(cors());

//test end point
server.get('/', (req, res) => {
    res.send('im running!')
})

//registers a user
server.post('/api/register', (req, res) => {
    const creds = req.body

    //hash our password
    const hash = bcrypt.hashSync(creds.password, 14)
    creds.password = hash;

    //check for creds
    if(!creds.username || !creds.password || !creds.department) {
        res.status(404).json({ message: 'Please enter a username, password, and department' })
    } else {
    //save our user
    db('user')
        .insert(creds) 
        .then(ids => {
            const id = ids[0]
            res.status(201).json({ newUserId: id })
        })
        .catch(err => {
            res.status(500).json(err)
          })
        }
})


server.listen(3300, () => console.log('running on port 3300'))