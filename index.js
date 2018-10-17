const express = require('express');
const cors = require('cors');
const knex = require('knex');

// security dependencies

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// server setup

const server = express();
const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);

// create a secret key and generation user tokens via jwt

const jwtSecret = 'SUPER SECRET KEY';

function createToken(user) {

  const jwtPayload = {
    ...user,
    greeting: 'Hello!'
    // placeholder for testing with other attributes
  };

  const jwtOptions = {
    expiresIn: '1h',
  };

  return jwt.sign(jwtPayload, jwtSecret, jwtOptions)
} // createToken

// basic GET for server testing

server.get('/api', (req, res) => {
  res.send('Server test successful.');
});

// register a user

server.post('/api/register', (req, res) => {
  const credentials = req.body;

  const hash = bcrypt.hashSync(credentials.password, 10);
  credentials.password = hash;

  db('users')
    .insert(credentials)
    .then(ids => {
      const id = ids[0];
      res.status(201).json({ newUserId: id });
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

// GET all users in the database

server.get('/api/users', protected, (req, res) => {
  db('users')
    .select('id', 'username', 'password', 'department')
    .then(users => {
      res.json({ users });
    })
    .catch(err => res.send(err.message));
});

// add protected() function for authentication

function protected(req, res, next) {
  const token = req.headers.authorization;

  if(token) {
    jwt.verify(token, jwtSecret, (err, plainToken) => {
      if(err) {
        // token verification failed
        res.status(401).json({ error: 'The provided token is invalid.'});
      } else {
        // valid token, grant access
        req.plainToken = plainToken;
        next();
      }
    })
  } else {
    res.status(400).json({ error: 'Please provide a token.'}) // don't include this, generally speaking
  }
  next();
}

// POST for user login

server.post('/api/login', (req, res) => {
  const credentials = req.body;

  db('users')
    .where({ username: credentials.username })
    .first()
    .then(user => {
      if(user && bcrypt.compareSync(credentials.password, user.password)) {
        const token = createToken(user);
        res.status(200).json({ welcome: user.username }); // test with returning token and password as well
      } else {
        res.status(401).json({ message: 'Access denied.' });
      }
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

// server instantiation

const port = 9000;

server.listen(port, () => console.log('Server listening on port 9000.'));
