const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./data/dbCongfig');

const server = express();
const port = 5000;

server.use(express.json(), cors(), helmet());

const jwtSecret = 'Doctor who?';

function generateToken(user) {
  const jwtPayload = {
    ...user,
  };
  const jwtOptions = {
    expiresIn: '30m',
  };
  return jwt.sign(jwtPayload, jwtSecret, jwtOptions);
}

server.post('/register', (req, res) => {
  const credentials = req.body;

  const hash = bcrypt.hashSync(credentials.password, 10);
  credentials.password = hash;

  db('users')
    .insert(credentials)
    .then(ids => {
      res.status(201).json({ newUserId: ids[0] });
    })
    .catch(err => {
      if (err.errno === 19) {
        res.status(400).json({ error: 'Username is already used.' });
      } else {
        res.status(500).json(err);
      }
    });
});

//Get users
server.get('/users', (req, res) => {
  db('users')
    .then(users => {
      if (users.length < 1) {
        res.status(401).json({ message: 'There are no users.' });
      } else {
        res.status(200).json(users);
      }
    })
    .catch(err => console.log(err));
});

server.listen(port, console.log(`===Server running on ${port} port===\n`));
