const express = require('express');
const db = require('./data/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const port = 5555;

const server = express();

server.use(express.json());

// ======================= ENDPOINTS =================

server.post('/api/register', (req, res) => {
  const credentials = req.body;

  const hash = bcrypt.hashSync(credentials.password, 14);
  credentials.password = hash;

  db('users').insert(credentials).then(ids => {
    const id = ids[0];
    res.status(201).json({ id, ...credentials})
  })
  .catch(err => res.status(500).json(err))
});

server.post('/api/login', (req, res) => {
  const credentials = req.body;

  db('users').where({ username: credentials.username}).first()
    .then(user => {
      if (user && bcrypt.compareSync(credentials.password, user.password)) {
        res.send('Welcome!');
      } else {
        return resnstatus(401).json({ error: 'Incorrect credentials' });
      }
    })
    .catch(err => {
      res.status(500).json({err});
    });
});

server.get('/api/users', (req, res) => {
  db('users').then(users => {
    res.status(200).json(users)
  })
  .catch(err => res.status(500).json(err));
}) ;

server.get('/', (req, res) => {
  res.send('The server is up and running.')
});


server.listen(port, function() {
  console.log(`\n ==== Web API listening on http://localhost:${port} ==== \n`);
});