const router = require('express').Router();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const secret = "toss me, but don't tell the elf!";

const User = require('../users/User');

router.post('/register', function(req, res) {
  User.create(req.body)
    .then(({ username, race }) => {
      // we destructure the username and race to avoid returning the hashed password
      const token = generateToken(user);
      // then we assemble a new object and return it
      res.status(201).json({ username, race });
    })
    .catch(err => res.status(500).json(err));
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
      res.send(error)
    })
})

function generateToken(user) {
  const options = {
    expiresIn: '1h',
  };
  const payload = { name: user.username };
  return jwt.sign(payload, secret, options)
}

function restricted(req, res, next) {
  const token = req.headers.autherization;
  if(token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      req.jwtPayload(decodedToken);
      if(err) {
        return res
          .status(401)
          .json({ message: 'you shall not pass! not decoded' })
      }
      next();
    })
  }
}
module.exports = router;
