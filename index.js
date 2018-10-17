const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.post('/register', (req, res) => {
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 10);
  creds.password = hash;

  db('users')
    .insert(creds)
    .then(ids => {
      const id = ids[0];
      res.status(201).json({ newUserId: id });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

const jwtSecret = 'I love Spikeball';

function generateToken(user) {
  const jwtPayload = {
    ...user,
    hello: 'User',
    role: 'Admin'
  };

  const jwtOptions = {
    expiresIn: '5m'
  };

  return jwt.sign(jwtPayload, jwtSecret, jwtOptions);
}

server.post('/login', (req, res) => {
  const credentials = req.body;

  db('users')
    .where({ username: credentials.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(credentials.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ welcome: user.username, token });
      } else {
        res.status(401).json({ message: 'You have been denied access' });
      }
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

function protected(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
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
}

function checkRole(role) {
  return function(req, res, next) {
    if (req.decodedToken && req.decodedToken.role.includes(role)) {
      next();
    } else {
      res.status(403).json({ message: 'You do not have access.' });
    }
  };
}

server.get('/users', protected, checkRole('Admin'), (req, res) => {
  db('users')
    .select('id', 'username', 'password', 'department')
    .then(users => {
      res.json({ users });
    })
    .catch(err => res.send(err));
});

server.get('/', (req, res) => res.json('Server is up and running!'));

const port = 6000;
server.listen(port, () => console.log(`API is listening on port ${port}.`));
