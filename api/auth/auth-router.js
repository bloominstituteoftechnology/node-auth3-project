const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userDB = require('../user/user-model');
const secrets = require('../../config/secrets');

const router = express.Router();

//register user
router.post('/register', validateUser, async (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;

  try {
    const newUser = await userDB.addUser(user);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error registering user' });
  }
})

//log in user
router.post('/login', validateLogin, async (req, res) => {
  let { username, password } = req.body;

  try {
    const user = await userDB.findUserByUsername(username);
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({
        message: `hello ${user.username}`,
        token
      })
    } else {
      res.status(401).json({ message: 'Invalid Credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error signing in' });
  }
})

//middleware and misc functions
function validateUser(req, res, next) {
  let user = req.body;
  if (!user.username || !user.password || !user.department) {
    res.status(400).json({ message: 'Invalid credentials entry'});
  } else {
    next();
  }
}

function validateLogin(req, res, next) {
  let user = req.body;
  if (!user.username || !user.password) {
    res.status(400).json({ message: 'Invalid credentials entry'});
  } else {
    next();
  }
}

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    role: user.department 
  };
  
  const options = {
    expiresIn: '8h'
  }

  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;