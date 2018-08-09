const express = require('express');
const db = require('../data/dbConfig.js');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');
const uuidv1 = require('uuid/v1');

const secret = 'Lambda 2018';

const generateToken = user => {
  const payload = {
    username: user.username,
  };
  const options = {
    expiresIn: '12h',
    jwtid: uuidv1(),
  };
  return jwt.sign(payload, secret, options);
}

router.post('/register', (req, res) => {
  const user = {...req.body};
  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;

  db('users')
    .insert(user)
    .then(id => {
      const token = generateToken(user);
      return res.status(201).json(token);
    })
    .catch(() => {
      return res.status(500).json({'error': 'Could not add user.'});
    });
});

router.post('/login', (req, res) => {
  const credentials = {...req.body};

  db('users')
    .where({username: credentials.username})
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(credentials.password, user.password)) {
        const token = generateToken(user);
        return res.status(200).json(token);
      }
      return res.status(401).json({'error': 'You shall not pass!'});
    })
    .catch(e => {
      return res.status(500).json(e);
    });
});

router.get('/users', (req, res) => {

});

module.exports = router;