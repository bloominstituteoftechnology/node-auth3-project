require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./database/dbConfig.js');

const server = express();

server.use(express.json());
server.use(cors());

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    department: ['sales', 'marketing'],
  };

  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: '1m',
  };

  return jwt.sign(payload, secret, options);
}

server.post('/api/login', (req, res) => {
  const creds = req.body;

  db('users')
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: 'we know you!', token });
      } else {
        res.status(401).json({ message: 'go away' });
      }
    })
    .catch(err => res.json(err));
});

function protected(req, res, next) {
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
    res.status(401).json({ message: 'dude where\'s your token' });
  }
}

server.get('/api/users', protected, checkRole('sales'), (req, res) => {
  db('users')
    .select('id', 'username', 'password')
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

function checkRole(role) {
  return function(req, res, next) {
    if (req.decodedToken && req.decodedToken.department.includes(role)) {
      next();
    } else {
      res.status(403).json({ message: 'you have no access to this resource' });
    }
  };
}

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
  res.send('Its Alive!');
});

server.listen(9000, () => console.log('\nrunning\n'));
