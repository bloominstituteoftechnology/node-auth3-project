require('dotenv').config();

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./database/dbConfig');

const server = express();
const port = 8080;

// generate a token
const generateToken = user => {
  const payload = {
    subject: user.id,
    username: user.username,
    department: user.department
  };

  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: '1m'
  };

  return jwt.sign(payload, secret, options)
};

// middleware
server.use(express.json());

// custom middleware
const protected = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: 'Invalid token' });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'No token provided' });
  }
};

server.listen(port, () => console.log(`Listening to port: ${port}`));

// ====================== ENDPOINTS ======================
// retrieve users
server.get('/api/users', protected, (_, res) => {
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
        const token = generateToken(user);
        res.status(200).json({ message: 'Logged in', token });
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
