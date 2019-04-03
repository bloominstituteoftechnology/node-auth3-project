const express = require('express');
const users = require('../helpers/usersDB.js');
const router = express.Router();
const bcrypt = require('bcryptjs');

router.get('/', async (req, res) => {
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
        req.session.user = user;
        const user = await users.getUsers();
        res.status(200).json(user);
      } catch (err) {
        res.status(500).json({ err });
      }
    } else {
      return res.status(401).json({ error: 'Invalid' });
    }
  } else
    res.status(500).json({ error: 'Provide a username and password' });
});
