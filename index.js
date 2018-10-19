require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./data/dbCongfig');

const server = express();
const port = process.env.PORT || 5000;

server.use(express.json(), cors(), helmet());

//===== Make token =====
const jwtSecret = process.env.JWT_SECRET || 'add a secret to your .env file';

function generateToken(user) {
  const jwtPayload = {
    ...user,
  };
  const jwtOptions = {
    expiresIn: '30m',
  };
  return jwt.sign(jwtPayload, jwtSecret, jwtOptions);
}

//===== Register the user =====
server.post('/api/register', (req, res) => {
  const credentials = req.body;

  const hash = bcrypt.hashSync(credentials.password, 10);
  credentials.password = hash;

  db('users')
    .insert(credentials)
    .then(ids => {
      return db('users')
        .where({ username: credentials.username })
        .first()
        .then(user => {
          const token = generateToken(user);
          res.status(201).json({ newUserId: user.id, token });
        });
    })
    .catch(err => {
      if (err.errno === 19) {
        res.status(400).json({ error: 'Username is already used.' });
      } else {
        res.status(500).json(err);
      }
    });
});

//===== Login user =====
server.post('/api/login', (req, res) => {
  const creds = req.body;

  db('users')
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ id: user.id, username: user.username, token });
      } else {
        res.status(401).json({ message: 'You shall not pass!' });
      }
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

//===== Get users =====
server.get('/api/users', protected, checkRole(), (req, res) => {
  db('users')
    .where({ department: req.dep })
    .then(users => {
      if (users.length < 1) {
        res.status(401).json({ message: 'There are no users.' });
      } else {
        res.status(200).json(users);
      }
    })
    .catch(err => res.status(500).json(`Server error --> ${err}`));
});

//===== Check if User logged in =====
function protected(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: 'invalid token' });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'You have no power here!' });
  }
}

//===== Check department and only show same department =====
function checkRole() {
  return function(req, res, next) {
    if (req.decodedToken && req.decodedToken.department) {
      req.dep = req.decodedToken.department;
      next();
    } else {
      res.status(403).json({ message: 'You have no permission!' });
    }
  };
}

server.listen(port, console.log(`===Server running on ${port} port===\n`));
