const router = require('express').Router();
const jwt = require('jsonwebtoken');
const secret = "toss me, but don't tell the elf!";

const User = require('../users/User');

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
    race: req.body.race,
    password: req.body.password
  }
  User.create(user)
    .then(response => {
      const token = generateToken(user);
      res.status(201).json(response);
    })
    .catch(err => {
      res.status(500).json(err)
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
            res.status(500).json("error comparing passwords")
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
