const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = require('./data/db');

const server = express();

server.use(express.json());

const secret = 'aliens are real';

const generateToken = user => {
  const payload = {
    username: user.username,
  };
  const options = {
    expiresIn: '1h',
    jwtid: '98546682',
  };
  return jwt.sign(payload, secret, options);
}

const protected = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res
          .status(401)
          .json({ error: 'You shall not pass! - invalid credentials' })
          .end()
      }
      req.jwtToken = decodedToken;
      next();
    })
  } else {
    res
      .status(401)
      .json({ error: 'You shall not pass! - no token provided'})
      .end()
  }
}

server.post('/api/register', (req, res) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 14);
  user.password = hash;
  db('users')
    .insert(user)
    .then(response => {
      const id = response[0];
      db('users')
        .where({ id })
        .first()
        .then(response => {
          const token = generateToken(response);
          res
            .status(201)
            .json(token)
            .end()
        })
        .catch(err => {
          res
            .status(500)
            .json(err)
            .end()
        })
    })
})

server.post('/api/login', (req, res) => {
  const credentials = req.body;
  const username = credentials.username;
  db('users')
    .where({ username })
    .first()
    .then(response => {
      const passwordMatch = bcrypt.compareSync(credentials.password, response.password);
      if (passwordMatch) {
        const token = generateToken(response);
        res
          .status(200)
          .send(token)
          .end()
      } else {
        res
          .status(401)
          .json({ error: 'Incorrect Credentials' })
          .end()
      }
    })
})

server.listen(8000, () => console.log('API runnin on Port 8000'));