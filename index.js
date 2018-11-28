require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./data/dbConfig');

const server = express();

server.use(express.json());
server.use(cors());

server.post('/api/register', (req, res) => {
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 11);

  creds.password = hash;

  db('users')
    .insert(creds)
    .then((id) => {
      res.status(201).json(id);
    })
    .catch((err) =>
      res.status(500).json({ message: 'could not register user', err })
    );
});

server.get('/', (req, res) => {
  res.json({ message: 'Its Alive!' });
});

server.listen(3300, () => console.log('\nrunning on port 3300\n'));
