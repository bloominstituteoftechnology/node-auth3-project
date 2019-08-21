const express = require('express');
const authenticate = require('../auth/auth_middleware');
const userDB = require('./user-model');
const router = express.Router();

router.get('/', authenticate, async (req, res) => {
  try {
    const users = await userDB.findUsersByDept(req.department);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error fetching users' })
  }
})

module.exports = router;