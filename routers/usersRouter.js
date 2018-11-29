const express = require('express');
const db = require('../database/dbConfig.js');
const protected = require('../functions/protected.js')

const router = express.Router();

router.get('/', protected, (req, res) => {
    db('users')
      .select('id', 'username', 'password', 'department') // ***************************** added password to the select
      .then(users => {
        res.status(200).json(users);
      })
      .catch(err => res.send(err));
  });

  module.exports = router;