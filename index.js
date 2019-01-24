const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./dbHelpers');

const server = express();
const secret = 'super-secret';

const generateToken = user => {
  const payload = {
    username: user.username
  };
  const options = {
    expiresIn: '1h'
  };

  return jwt.sign(payload, secret, options);
};

server.use(express.json());
server.use(cors());

// root endpoint to make sure server is working
server.get('/', (req, res) => {
  res.send('Server is live!');
});

server.post('/api/register', (req, res) => {
  const user = req.body;
  user.password = bcrypt.hashSync(user.password, 14);
  db.insertUser(user)
    .then(id => {
      db.findByUsername(user.username).then(user => {
        const token = generateToken(user);
        res.status(201).json({ id: user.id, token });
      });
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

server.post('/api/login', (req, res) => {});

server.get('/api/users', (req, res) => {
  db.getUsers()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

const PORT = 5500;
server.listen(PORT, () => {
  console.log(`\n=== Server is up and running on port ${PORT} ===\n`);
});
