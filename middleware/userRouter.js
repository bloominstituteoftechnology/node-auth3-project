require('dotenv').config();
const express = require('express');
const router = express.Router();
const db = require('../database/dbConfig');
const jwt = require('jsonwebtoken');

function protected(req, res, next) {
  // token is normally sent in the Authorization header
  const token = req.headers.authorization;
  console.log(req.headers)
  if (token) {
    // is it valid
    jwt.verify(token, process.emitWarning.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        // token is invalid
        res
          .status(401)
          .json({
            message: "Invalid token!", 
            err, 
          });
      } else {
        // token is good!
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    // bounced
    res
      .status(401)
      .json({
        message: 'Token not provided'
      })
  }
}

function checkRole(role) {
  return function(req, res, next) {
    if (req.decodedToken && req.decodedToken.roles.includes(role)) {
      next();
    } else {
      res.status(403).json({ message: 'you have no access to this resource' });
    }
  };
}


router.get('/', protected, checkRole('sales'), (req, res) => {
  db('users')
    .select('id', 'username', 'role')
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;