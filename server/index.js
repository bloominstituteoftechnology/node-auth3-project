const express = require('express');
const db = require('./data/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const port = 5555;

const server = express();

server.use(express.json());

// ======================= ENDPOINTS =================

server.post('/api/register', (req, res) => {
  const credentials = req.body;

  const hash = bcrypt.hashSync(credentials.password, 14);
  credentials.password = hash;

  db('users')
    .insert(credentials)
    .then(function(ids) {
      db('users')
        .where({ id: ids[0] })
        .first()
        .then(user => {
          const token = generateToken(user);
          res.status(201).json(token);
        });
  })
  .catch(err => res.status(500).json(err))
});

const secret = 'nobody tosses a dwarf!';

function generateToken(user) {
  const payload = {
    username: user.username,
  };

  const options = {
    expiresIn: '1h',
    jwtid: '07091988',
  };

  return jwt.sign(payload, secret, options);
}

function protected(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ error: 'you shall not pass!! - token invalid'});
      }

      req.jwtToken = decodedToken;
      next();
    });
  } else {
    return res.status(401).json({ error: 'you shall not pass!! - no token' });
  }
}

server.post('/api/login', (req, res) => {
  const credentials = req.body;

  db('users').where({ username: credentials.username}).first()
    .then(user => {
      if (user && bcrypt.compareSync(credentials.password, user.password)) {
        const token = generateToken(user);
        res.send(token);
      } else {
        return resnstatus(401).json({ error: 'Incorrect credentials' });
      }
    })
    .catch(err => {
      res.status(500).json({err});
    });
});

server.get('/api/users', protected, (req, res) => {
  db('users').then(users => {
    res.status(200).json(users)
  })
  .catch(err => res.status(500).json(err));
}) ;

server.get('/', (req, res) => {
  res.send('The server is up and running.')
});


server.listen(port, function() {
  console.log(`\n ==== Web API listening on http://localhost:${port} ==== \n`);
});