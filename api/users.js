const express = require('express');
const db = require('../data/dbConfig');
const jwt = require('../jwtConfig');

const router = express.Router();

//get all saved users, if logged in
router.get('/', jwt.protected, (req, res) => {
  db('users')
    .where({ department: req.user.department })
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
