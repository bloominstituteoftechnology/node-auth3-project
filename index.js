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
    user: user.department
  };
  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: '1h'
  };
  return jwt.sign(payload, secret, options);
}

function protected(req, res, next) {
  //token is normally sent in the Authorization header
  const token = req.headers.authorization;
  if (token) {
    //is it valid
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        //token is invalid
        res.status(401).json({ message: 'invalid token' });
      } else {
        //token is good
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    //bounced
    res.status(401).json({ message: 'no token provided' });
  }
}

server.get('/', (req, res) => {
  console.log('firing');
  res.send("It's alive!");
});

server.post('/api/register', (req, res) => {
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 12);
  creds.password = hash;

  db('users')
    .insert(creds)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.send(err);
    });
});

server.post('/api/login', (req, res) => {
  const creds = req.body;
  db('users')
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        //passwords match and user exists by that username
        //created a session > create a token
        //library sent cookie automatically > the token is sent manually
        const token = generateToken(user);
        res.stuats(200).json({ message: 'welcome!', token });
      } else {
        res.status(401).json({ message: 'You shall not pass!' });
      }
    })
    .catch(err => res.json(err));
});

server.get('/api/users', protected, (req, res) => {
  db('users')
    .select('id', 'username')
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.send(err));
});

const port = 4242;
server.listen(port, function() {
  console.log('\nrunning on port 4242\n');
});
