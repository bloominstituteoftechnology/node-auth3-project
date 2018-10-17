const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../data/helpers/index.js');

const generateToken = user => {
  const jwtPayload = {
    ...user,
    hello: 'FSW13',
    roles: ['admin', 'root'],
  };

  const jwtSecret = 'how.now.brown.cow.!';

  const jwtOptions = {
    expiresIn: '5m',
  };

  return jwt.sign(jwtPayload, jwtSecret, jwtOptions);
};

server.post('/login', (req, res) => {
  const creds = req.body;

  db.loginUser(user)
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        // generate token for specific user.
        const token = generateToken(user);
        // found the user.
        res.status(200).json({ welcome: user.username, token });
      } else {
        res.status(401).json({
          message: `You shall not pass... as you are not authenticated.`,
        });
      }
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

module.exports = router;
