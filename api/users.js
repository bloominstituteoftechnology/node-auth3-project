const express = require('express');
const db = require('../data/dbConfig');
const jwtConfig = require('../jwtConfig');

const router = express.Router();

//get all saved users, if logged in
router.get('/', jwtConfig.protected, (req, res) => {
  db('users')
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
