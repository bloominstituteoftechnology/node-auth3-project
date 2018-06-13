const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const secret = 'BqhfgTZKTKDEg6sudxFv';

const generateToken = payload => {
  const options = {
    expiresIn: '1h'
  }
  return jwt.sign(payload, secret, options);
};

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, secret, (error, decodedToken) => {
    if(error){
      return res.status(401).json({ error: 'Access denied. Invalid token.' });
    } else {
      req.tokenPayload = decodedToken;
      next();
    }
  });
};

module.exports = {
  server: function (server) {
    server.use(helmet());
    server.use(morgan('dev'));
    server.use(express.json());
    server.use(cors());
  },
  generateToken: generateToken,
  authenticate: authenticate
};
