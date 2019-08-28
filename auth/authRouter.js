const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../users/usersModel');

const router = express.Router();

/********************************************************
 *                  POST /api/auth/register             *
 ********************************************************/
router.post('/register', async (req, res, next) => {
  let user = req.body;

  try {
    user.password = bcrypt.hashSync(user.password, 10);
    user = await Users.add(user);

    res.status(201).json({
      id: user.id,
      username: user.username,
      department: user.department
    });
  } catch (err) {
    next(err);
  }
});

/********************************************************
 *                  POST /api/auth/register             *
 ********************************************************/
router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await Users.findBy({ username }).first();

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);

      console.log(token);

      res.status(200).json({
        message: `Welcome ${user.username}`,
        token
      });
    }
  } catch (err) {
    next(err);
  }
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    department: user.department
  };

  const options = {
    expiresIn: '1h'
  };

  return jwt.sign(
    payload,
    process.env.LOGIN_SECRET || 'sooperdoopersecret',
    options
  );
}

module.exports = router;
