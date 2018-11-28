const express = require('express');
const bcrypt = require('bcryptjs');

const db = require('../database/dbConfig.js');

const generateToken = require('../functions/generateToken.js');

const router = express.Router();

router.post('/', (req, res) => {
    const creds = req.body;
  
    db('users')
      .where({ username: creds.username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(creds.password, user.password)) {
          const token = generateToken(user)
          res.status(200).json({ message: 'welcome!', token });
        } else {
          res.status(401).json({ message: 'you shall not pass!!' });
        }
      })
      .catch(err => res.json(err));
  });

  module.exports = router;
