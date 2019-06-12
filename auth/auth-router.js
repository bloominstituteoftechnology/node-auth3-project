const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../user/user-model')
const secrets = require('../config/secrets')

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 8);
    user.password = hash;

    User.add(user)
    .then(saved => {
        res.status(201).json(saved)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

router.post('/login', (req, res) => {
    let { username, password} = req.body;

    User.findBy({ username })
    .first()
    .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user);

            res.status(200).json({
                message: `Welcome back ${user.username}.`,
                token,
            })
        } else {
            res.status(401).json({ message: 'Incorrect Username or Password. Please try again.'});
        }
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

function generateToken(user) {
    const payload = {
      subject: user.id,
      username: user.username,
      roles: ['student'],
    };
  
    const options = {
      expiresIn: '1d',
    };
  
    return jwt.sign(payload, secrets.jwtSecret, options);
  }
  
  module.exports = router;
  