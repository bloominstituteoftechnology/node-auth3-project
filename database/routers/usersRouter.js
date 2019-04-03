const express = require('express');
const users = require('../helpers/usersDB.js');
const router = express.Router();
const restrict = require('../../auth/restricted.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config/secrets.js');

router.get('/', restrict, async (req, res) => {
  try {
    const user = await users.getUsers();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ err });
  };
});

router.post('/register', async (req, res) => {
  const { body } = req

  if (body) {
    const hash = bcrypt.hashSync(body.password, 10);
    body.password = hash;

    try {
      const user = await users.addUser(body);
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json({ err });
    };
  } else {
    res.status(500).json({ error: 'Provide a username and password' });
  }
});

router.post('/login', async (req, res) => {
  const { body } = req;

  if (body) {
    const user = await users.findUser(body);

    if (user || bcrypt.compareSync(body.password, user.password)) {
      try {
        const token = generateToken(user);
        res.status(200).json({ token, message: 'Welcome' });
      } catch (err) {
        res.status(500).json({ err });
      }
    } else {
      return res.status(401).json({ error: 'Invalid' });
    }
  } else
    res.status(500).json({ error: 'Provide a username and password' });
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  }
  
  const options = {
    expiresIn: '1d'
  }

  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
