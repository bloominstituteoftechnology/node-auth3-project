const express = require('express');
const bcrypt = require('bcryptjs');

const db = require('./database/dbConfig');

const server = express();
const port = 8080;

// middleware
server.use(express.json());

server.listen(port, () => console.log(`Listening to port: ${port}`));

// ====================== ENDPOINTS ======================
// retrieve users
server.get('/api/users', (_, res) => {
  db('users')
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.status(500).json(err));
});

// register a new user
server.post('/api/register', (req, res) => {
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 8);
  creds.password = hash;

  db('users')
    .insert(creds)
    .then(id => {
      res.status(201).json({ message: `ID ${id} created` });
    })
    .catch(err => res.status(500).json(err));
});

// login a user
server.post('/api/login', (req, res) => {
  const creds = req.body;

  db('users')
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        res.status(200).json({ message: 'Logged in' });
      } else {
        res.status(401).json({ message: 'You shall not pass!' });
      }
    })
    .catch(err => res.status(500).json(err));
})

// test API
server.get('/', (_, res) => {
  res.send('API is live!');
});
