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
      department: user.department,
    };

const secret = process.env.JWT_SECRET;
const options = {
    expiresIn: '1m',
  };
  return jwt.sign(payload, secret, options);
}

function protected(req, res, next) {
    // token is normally sent in the the Authorization header
    const token = req.headers.authorization;
  
    if (token) {
      // is it valid
      jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
          // token is invalid
          res.status(401).json({ message: 'invalid token' });
        } else {
          // token is gooooooooooood
          req.decodedToken = decodedToken;
          next();
        }
      });
    } else {
      // bounced
      res.status(401).json({ message: 'not token provided' });
    }
  }