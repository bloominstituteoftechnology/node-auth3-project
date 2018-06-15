const router = require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('../users/User');

const secret = "toss me, but don't tell the elf!";

function generateToken(user) {
  const options = {
    expiresIn: '1h',
  };
  const payload = { name: user.username };
  return jwt.sign(payload, secret, options)
}

router.post('/register', function(req, res) {
  const user = {
    username: req.body.username,
    password: req.body.password,
    race: req.body.race,
  }
  User.create(user)
    .then(response => {
      const token = generateToken(user);
      res.status(201).json(response);
    })
    .catch(error => {
      res.status(500).json({ message: error.message })
    });
});

router.post('/login', function(req, res) {
  const { username, password } = req.body;
  User
    .findOne({ username })
    .then(user => {
      if(user) {
        user
          .validatePassword(password)
          .then(passwordsMatch => {
            if(passwordsMatch) {
              const token = generateToken(user);
              req.header.authorization = token;
              res.status(200).json({ message: `welcome ${username}!`, token })
            } else {
              res.status(401).send("Invalid Credentials")
            }
          })
          .catch(error => {
            res.status(500).json("Error Comparing Passwords")
          })
      } else {
        res.status(401).send("Invalid Credentials")
      }
    })
    .catch(error => {
      res.status(500).error({ error: error.message })
    })
})

module.exports = router;
