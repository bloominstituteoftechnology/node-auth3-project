const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('./data/db');
const jwt = require('jsonwebtoken');
const server = express();

server.use(express.json());

server.post('/api/register', (req, res) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 14);
  user.password = hash;

  db('users')
    .insert(user)
    .then((ids) => {
      db('users')
        .where({ id: ids[0] })
        .first()
        .then((user) => {
          const token = generateToken(user);
          res.status(201).json(token);
        });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

const secret = 'I love icecream!';

function generateToken(user) {
  const payload = {
    username: user.username
  };

  const options = {
    expiresIn: '1h',
    jwtid: '8728391'
  };

  return jwt.sign(payload, secret, options);
}

server.post('/api/login', function(req, res) {
  const credentials = req.body;

  db('users')
    .where({ username: credentials.username })
    .first()
    .then((user) => {
      if (user && bcrypt.compareSync(credentials.password, user.password)) {
        const token = generateToken(user);
        res.send(`welcome ${user.username}`);
      } else {
        return res.status(401).json({ error: 'Incorrect credentials' });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

const protected = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        return res
          .status(401)
          .json({ error: 'Incorrect credentials, token invalid, you put in the wrong token' });
      }
      req.jwtToken = decodedToken;
      next();
    });
  } else {
    return res.status(401).json({ error: 'Incorrect credentials, no token' });
  }
};

server.get('/api/users', protected, (req, res) => {
  db('users')
    .then((users) => {
      res.json(users);
    })
    .catch((err) => res.send(err));
});

const port = 5000;
server.listen(port, () => {
  console.log(`server on http://localhost:${port}`);
});
