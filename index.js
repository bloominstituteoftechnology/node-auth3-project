require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());
server.use(cors());

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    roles: ['sales', 'marketing'],
  };

  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: '1h',
  };

  return jwt.sign(payload, secret, options);
}

server.post('/api/login', (req, res) => {
  const creds = req.body;

  db('users')
    .where({ username: creds.username })
    .first()
    .then(user => {
      if(user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: 'Aloha!', token});
      } else {
        res.status(401).json({ message: 'nope'})
      }
    })
    .catch(err => res.json(err));
});

server.post('/api/register', (req, res) => {
  const creds = req.body;

  const hash = bcrypt.hashSync(creds.password, 4);

  creds.password = hash;

  db('users')
    .insert(creds)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => json(err));
});

server.get('/', (req, res) => {
  res.send('yep');
});

server.listen(8800, () => console.log('\nRunning on Port 8800\n'));