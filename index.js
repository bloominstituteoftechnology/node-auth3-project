const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userHelper = require('./database/helpers/userHelper');

const server = express();
const port = 8000;

server.use(express.json());
server.use(cors());

const secret = 'use ENV file';

function generateToken(user) {
  const payload = {
    userId: user.id,
  };
  const options = {
    expiresIn: '1h',
  };
  return jwt.sign(payload, secret, options);
}

function protect(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ error: 'Invalid token' });
      } else {
        next();
      }
    });
  } else {
    res.status(401).json({ error: 'You shall not pass!' });
  }
}

server.post('/api/register', (req, res) => {
  const user = req.body;
  user.password = bcrypt.hashSync(user.password);
  userHelper.insert(user)
    .then(ids => res.status(201).json({ id: ids[0] }))
    .catch(err => res.status(500).json(err));
});

server.post('/api/login', (req, res) => {
  const user = req.body;
  userHelper.findByUsername(user)
    .then((users) => {
      if (users.length && bcrypt.compareSync(user.password, users[0].password)) {
        const token = generateToken(users[0]);
        res.json({ message: 'Login successful', token });
      } else {
        res.status(401).json({ error: 'You shall not pass!' });
      }
    })
    .catch(err => res.status(500).json(err));
});

server.get('/api/users', protect, (req, res) => {
  userHelper.findUsers()
    .then(users => res.json(users))
    .catch(err => res.status(500).json(err));
});

server.listen(port, console.log(`\nWeb API running on port ${port}\n`));
