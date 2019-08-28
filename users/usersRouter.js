const express = require('express');
const Users = require('./usersModel');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const users = await Users.find();
    res.status(200).json({
      users
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
