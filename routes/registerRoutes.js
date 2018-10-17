const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../data/helpers/index.js');

const router = express.Router();

router.post('/', (req, res) => {
  const creds = req.body;

  const hash = bcrypt.hashSync(creds.password, 8);
  creds.password = hash;

  db.registerUser(creds)
    .then(ids => {
      const id = ids[0];
      res.status(201).json({ newUserId: id });
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

module.exports = router;
