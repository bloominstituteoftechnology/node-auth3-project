const express = require('express');
const bcrypt = require('bcrypt');
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

module.exports = router;
