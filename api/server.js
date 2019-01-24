require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const bcrypt = require('bcryptjs'); // added
const jwt = require('jsonwebtoken');
const cors = require('cors');
const knexConfig = require('../knexfile.js');

const server = express();

const db = knex(knexConfig.development);

server.use(cors());
server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
  res.send('Working!');
});

const responseStatus = {
  success: 200,
  postCreated: 201,
  badRequest: 400,
  unauthorised: 401,
  forbidden: 403,
  notFound: 404,
  serverError: 500
};

server.post('/api/register', async (req, res) => {
  try {
    const userInfo = req.body;
    const hash = bcrypt.hashSync(userInfo.password, 12);
    userInfo.password = hash;
    const ids = await db('users').insert(userInfo);
    res.status(responseStatus.postCreated).json(ids);
  } catch (error) {
    res.status(responseStatus.serverError).json(error);
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

server.post('/api/login', async (req, res) => {
  try {
    const creds = req.body;
    const user = await db('users')
      .where({ username: creds.username })
      .first(); // this would show two instances of the user without first. Not sure why atm
    if (user && bcrypt.compareSync(creds.password, user.password)) {
      // login is successful
      // create the token
      const token = generateToken(user);
      res
        .status(responseStatus.success)
        .json({ message: `Welcome ${user.username}`, token });
    } else {
      res
        .status(responseStatus.unauthorised)
        .json({ message: 'You shall not pass!' });
    }
  } catch (error) {
    res.status(responseStatus.serverError).json(error);
  }
});

function lock(req, res, next) {
  // the auth token is normally sent in the Authorization header
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res
          .status(responseStatus.unauthorised)
          .json({ message: 'Invalid token' });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res
      .status(responseStatus.unauthorised)
      .json({ message: 'No token provided' });
  }
}

function checkDepartment(department) {
  return function(req, res, next) {
    if (req.decodedToken.department.includes(department)) {
      next();
    } else {
      res
        .status(responseStatus.forbidden)
        .json({ message: `You need to be an ${department}` });
    }
  };
}

// protect this endpoint so only logged in users can see it
server.get('/api/users', lock, checkDepartment('admin'), async (req, res) => {
  const users = await db('users').select('id', 'username');
  res.status(responseStatus.success).json({
    users,
    decodedToken: req.decodedToken
  });
});

module.exports = server;
