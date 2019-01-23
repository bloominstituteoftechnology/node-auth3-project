require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const bcrypt = require('bcryptjs'); // added
const jwt = require('jsonwebtoken');

const knexConfig = require('../knexfile.js');

const server = express();

const db = knex(knexConfig.development);

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
  res.send('sanity check');
});

server.post('/register', (req, res) => {
  const userInfo = req.body;
  const hash = bcrypt.hashSync(userInfo.password, 12);
  userInfo.password = hash;
  db('users')
    .insert(userInfo)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => res.status(500).json(err));
});

function generateToken(user) {
  const payload = {
    username: user.username,
    name: user.name,
    roles: ['admin', 'sales'] // should come from database user.roles
  };
  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: '45m'
  };
  return jwt.sign(payload, secret, options);
}

server.post('/login', (req, res) => {
  const creds = req.body;
  db('users')
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        // login is successful
        // create the token
        const token = generateToken(user);
        res.status(200).json({ message: `welcome ${user.username}`, token });
      } else {
        res.status(401).json({ message: 'You shall not pass!!' });
      }
    })
    .catch(err => res.status(500).json(err));
});

function lock(req, res, next) {
  // the auth token is normally sent in the Authorization header
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: 'invalid token' });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'no token provided' });
  }
}

function checkRole(role) {
  return function(req, res, next) {
    if (req.decodedToken.roles.includes(role)) {
      next();
    } else {
      res.status(403).json({ message: `you need to be an ${role}` });
    }
  };
}

// protect this endpoint so only logged in users can see it
server.get('/users', lock, checkRole('admin'), async (req, res) => {
  const users = await db('users').select('id', 'username');
  res.status(200).json({
    users,
    decodedToken: req.decodedToken
  });
});

server.get('/users/me', lock, checkRole('accountant'), async (req, res) => {
  const user = await db('users')
    .where({ username: req.decodedToken.username })
    .first();

  res.status(200).json(user);
});

server.get('/users/:id', lock, async (req, res) => {
  const user = await db('users')
    .where({ id: req.params.id })
    .first();

  res.status(200).json(user);
});

module.exports = server;
