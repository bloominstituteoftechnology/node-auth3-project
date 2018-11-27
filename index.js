const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('Whazzahh!');
  });

server.post('/register', (req,res) => {
    const credentials = req.body;
    // hash!
    const hash = bcrypt.hashSync(credentials.password, 2)
    credentials.password = hash;
    db('users')
    .insert(credentials)
    .then(ids => {
        const id = ids[0];
        res.status(201).json({newUserId: id})
    })
})

// testing to see if a user has been created
server.get('/users', (req, res) => {
    db('users')
      .select('id', 'username', 'password', 'department')
      .then(users => {
        res.json(users);
      })
      .catch(err => res.send(err));
  });
  

server.listen(4200, () => console.log('\nParty at port 4200\n'));
