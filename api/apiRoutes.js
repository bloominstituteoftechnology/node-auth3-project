const express = require('express');
const db = require('../data/db');
const bcrypt = require('bcryptjs');
const { secret, generateToken, checkRestricted } = require('../middleware');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const credentials = req.body;
    const hash = bcrypt.hashSync(credentials.password, 14);
    credentials.password = hash;
    const newUserId = await db('users').insert(credentials);
    try {
      const user = await db('users').where({ id: newUserId[0] }).first();
      const token = generateToken(user);
      return res.status(201).send(token);
    } catch (error) {
      return res.status(404).json({ message: "User does not exist." });
    }
  } catch (error) {
    return res.status(500).json({ message: "User could not be registered." });
  }
});

router.post('/login', async (req, res) => {
  try {
    const credentials = req.body;
    const user = await db('users').where({ username: credentials.username }).first();
    if (user && bcrypt.compareSync(credentials.password, user.password)) {
      const token = generateToken(user);
      return res.status(200).send(token);
    } else {
      return res.status(404).json({ message: "You shall not pass!" });
    }
  } catch (error) {
    return res.status(500).json({ message: "An error occurred during login." });
  }
});

router.get('/users', checkRestricted, async (req, res) => {
  try {
    const allUsers = await db('users');
    return res.status(200).json(allUsers);
  } catch (error) {
    return res.status(500).json({ message: "Users could not be fetched." });
  }
});

module.exports = router;
