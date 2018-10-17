const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { secret, tokenGenerator, restricted } = require('../middleware');
const db = require('../data/dbConfig');

router.get('/', (req, res) => {
  res.send('test');
});

router.post('/register', (req, res) => {
  const credentials = req.body;
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
  const creds = req.body;

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
    .select('id', 'username')
    .then((users) => {
      res.json({ users });
    })
    .catch((err) => res.send(err));
});

module.exports = router;
