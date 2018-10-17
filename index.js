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
    .insert('credentials')
    .then(ids => {
      const id = ids[0];
      res.status(201).json({ newUserId generated: id });
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
        res.status(401).json({ error: 'The provided token is invalid. '});
      } else {
        // valid token, grant access
        req.plainToken = plainToken;
        next();
      }
    })
  } else {
    res.status(400).json({ error: 'Please provide a token. '}) // don't include this, generally speaking
  }
  next();
}








// server instantiation

const port = 9000;

server.listen(port, () => console.log('Server listening on port 9000.'));
