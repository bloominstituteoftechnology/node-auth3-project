const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { secret, tokenGenerator, restricted } = require('../middleware');
const db = require('../data/dbConfig');

router.post('/register', (req, res) => {
  const { username, password, department } = req.body;
  const credentials = { username, password, department };
  const hash = bcrypt.hashSync(credentials.password, 14);
  credentials.password = hash;
  db('users')
    .insert(credentials)
    .then((ids) => {
      const id = ids[0];
      res.status(201).json({ newUserId: id });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const creds = { username, password };

  db('users')
    .where({ username: creds.username })
    .first()
    .then((user) => {
      console.log(user);
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = tokenGenerator(user);
        res.status(200).json({ welcome: user.username, token });
      } else res.status(500).json({ error: 'You shall not pass' });
    });
});

router.get('/users', restricted, (req, res) => {
  db('users')
    .select('id', 'username', 'department')
    .then((users) => {
      res.json({ users });
    })
    .catch((err) => res.send(err));
});

module.exports = router;
