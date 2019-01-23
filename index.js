const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const knex = require('knex');

const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());

const secret = 'heydontlook'

function generateToken(user) {
  const payload = {
    username: user.username,
  };

  const options = {
    expiresIn: '1h',
    jwtid: '12345' // jti
  };

  return jwt.sign(payload, secret, options);
};

// middleware
function protected(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: 'Invalid Token' });
      } else {
        req.username = decodedToken.username;

        next();
      }
    })
  } else {
    res.status(401).json({ message: 'No token inserted' });
  }
};

// endpoints
server.get('/', (req, res) => {
  res.send(`We're here`);
});

// Creates a user using the info sent inside the body of the req
server.post('/api/register', (req, res) => {
  const creds = req.body;

  const hash = bcrypt.hashSync(creds.password, 10);
  creds.password = hash;

  db('users')
    .insert(creds)
    .then(ids => {
      const id = ids[0];

      db('users')
        .where({ id })
        .first()
        .then(user => {
          const token = generateToken(user);
          res.status(201).json({ id: user.id, token });
        })
    })
    .catch(err => res.status(500).send(err));
});

// Use the creds sent inside the body to authenticate user
server.post('/api/login', (req, res) => {
  const creds = req.body;

  db('users')
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: 'You shall not pass!' })
      }
    })
    .catch(err => res.status(500).send(err));
});

// protect this one
server.get('/api/users', protected, (req, res) => {
  db('users')
    .select('id', 'username', 'password')
    .then(users => {
      res.json(users)
    })
    .catch(err => {
      res.status(500).send(err);
    })
});

server.post('/api/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      res.status(500).send('Failed to logout');
    } else {
      res.send('Logout successful');
    }
  })
});

server.listen(3000, () => console.log('\nRunning on port 3000\n'))
