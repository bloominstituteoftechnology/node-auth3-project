const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('./secrets.js');
const Users = require('../api/users-model.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors({origin: true, credentials: true}));

// Function that generates token
function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };
  const secret = 'the secret';
  const options = {
    expiresIn: '1d'
  };
  return jwt.sign(payload, secret, options)
}

// Middleware to restrict access
function restricted(req, res, next) {
    const token = req.headers.authorization;
  
    if (token) {
      jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
        if (err) {
          res.status(401).json({ message: "Invalid token" });
        } else {
          //req.decodedToken = decodedToken;
          next();
        }
      });
    } else {
      res.status(401).json({ message: "No token provided" });
    }
  }
// *** End Poiints ***
  server.post('/api/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 4); // 2 ^ n
    user.password = hash;
    console.log(user)
    Users.add(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });

  server.post('/api/login', (req, res) => {
    let { username, password } = req.body;
  
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({
            message: `Welcome ${user.username}!`,
            token,
          });
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });

  server.get('/api/users', restricted, (req, res) => {
    Users.find()
      .then(users => {
        if (users) {
          res.status(200).json(users);
        } else {
          res.status(401).json({ message: 'You shall not pass!' });
        }
      })
      .catch(err =>
        res
          .status(500)
          .json({ error: 'User information could not be retrieved.' })
      );
  });

module.exports = server;
