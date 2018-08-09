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
    expiresIn: '12h'
  };
  return jwt.sign(payload, secret, options);
}

const protected = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secret, (e, decodedToken) => {
      if (e) {
        return res.status(401).json({'error': 'You shall not pass! protect 0'});
      }
      req.jwtToken = decodedToken;
      next();
    });
  } else {
    return res.status(401).json({'error': 'You shall not pass! protect 1'});
  }
}

router.post('/register', (req, res) => {
  const user = {...req.body};
  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;

  db('users')
    .insert(user)
    .then(id => {
      const token = generateToken(user);
      return res.status(201).json({'auth': true, 'token': token});
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
        return res.status(200).json({'auth': true, 'token': token});
      }
      return res.status(401).json({'error': 'You shall not pass!'});
    })
    .catch(e => {
      return res.status(500).json(e);
    });
});

router.get('/users', protected, (req, res) => {
  console.log('token', req.jwtToken);
  db.select('id', 'username', 'department', 'created_at').from('users')
  .then( users => {
    return res.status(200).json(users);
  })
  .catch(e => {
    return res.status(500).json(e);
  });
});


module.exports = router;