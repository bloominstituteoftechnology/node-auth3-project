const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const Users= require('../data/userdb')


router.post('/', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
    user.password = hash;
  
    Users.add(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });


module.exports = router;