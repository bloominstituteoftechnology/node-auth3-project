require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const bcrypt = require('bcryptjs'); // added
const jwt = require('jsonwebtoken');

const knexConfig = require('../knexfile.js');

const server = express();

const db = knex(knexConfig.development);

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
  res.send('Working!');
});

server.post('/register', async (req, res) => {
  try {
    const userInfo = req.body;
    const hash = bcrypt.hashSync(userInfo.password, 12);
    userInfo.password = hash;
    const ids = await db('users').insert(userInfo);
    res.status(201).json(ids);
  } catch (error) {
    res.status(500).json(error);
  }
});

function generateToken(user) {
  const payload = {
    username: user.username,
    department: ['admin', 'NYC']
  };
  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: '45m'
  };
  return jwt.sign(payload, secret, options);
}

server.post('/login', async (req, res) => {
  try {
    const creds = req.body;
    const user = await db('users')
      .where({ username: creds.username })
      .first(); // this would show two instances of the user without first. Not sure why atm
    if (user && bcrypt.compareSync(creds.password, user.password)) {
      // login is successful
      // create the token
      const token = generateToken(user);
      res.status(200).json({ message: `Welcome ${user.username}`, token });
    } else {
      res.status(401).json({ message: 'You shall not pass!' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

function lock(req, res, next) {
  // the auth token is normally sent in the Authorization header
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: 'invalid token' });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'no token provided' });
  }
}

function checkDepartment(department) {
  return function(req, res, next) {
    if (req.decodedToken.department.includes(department)) {
      next();
    } else {
      res.status(403).json({ message: `you need to be an ${department}` });
    }
  };
}

// protect this endpoint so only logged in users can see it
server.get('/users', lock, checkDepartment('admin'), async (req, res) => {
  const users = await db('users').select('id', 'username');
  res.status(200).json({
    users,
    decodedToken: req.decodedToken
  });
});

module.exports = server;
