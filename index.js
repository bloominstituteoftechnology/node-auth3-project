const express = require('express');
const db = require('./data/db');
const server = express();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


server.use(express.json());

server.get('/', (req, res) => {
  res.send('Its Alive!');
});
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
        });
    })
    .catch(function(error) {
      res.status(500).json({ error: 'Could not register user' });
    });
});

server.post('/api/login', (req, res) => {
  const credentials = req.body;
  db('users')
  .where({ username: credentials.username })
  .first()
  .then(user => {
    if (user && bcrypt.compareSync(credentials.password, user.password)) {
      return res.status(200).json({'message': 'You are now logged in.'})
    }
    return res.status(401).json({'errorMessage': 'The username and password you entered did not match our records. You shall not pass!'})
  })
  .catch(err => {
    res.status(500).json({'error': 'Could not login user'})
  })
});

server.get('/api/users', protected, (req, res) => {
  db('users')
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({'error': 'Could not display users'})
    });
  });


const port = 8080;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
