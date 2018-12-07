require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../database/dbConfig');
const jwt = require('jsonwebtoken');

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    roles: ['sales', 'research', 'management', 'IT support'], // this will come from the database
  };

  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: '24hr',
  };

  return jwt.sign(payload, secret, options);
}


router.post('/', (req, res) => {
  // grab username and password from body
  const credentials = req.body;

  db('users')
    .where({
      username: credentials.username
    })
    .first()
    .then(user => {
      if(user && bcrypt.compareSync(credentials.password, user.password)) {
        // passwords match and user exists by that username
        // created a token
        // we send the token manually
        const token = generateToken(user);
        res
          .status(200).json({
            message: 'Welcome!', 
            token
          });
      } else {
        // either username is invalid or password is wrong
        res
          .status(401)
          .json({
            message: 'Your login credentials did not pass the test!'
          });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({
          message: "Sorry, there was a problem logging you in.", 
          err
        })
    })
})

module.exports = router;