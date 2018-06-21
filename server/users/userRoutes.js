const router = require('express').Router();
const jwt = require('jsonwebtoken');

const secret = "Chill bro, no one makes it out alive";
const User = require('./User');

function restricted(req, res, next) {
  const token = req.headers.authorization;

  if(token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      req.jwtPayload = decodedToken;
      if (err) {
        return res.status(401).json({message: 'YOU SHALL NOT PASS! YOUR TOKEN IS NO GOOD HERE!'});
      }
      next();
    });
  } else {
    res.status(401).json({message: 'Token or GTFO!'});
  }
}

router.get('/api/users', restricted, (req, res) => {
  User
    .find()
    .then(users => {
      res.status(201).json({ user })
    })
    .catch(err => {
      res.status(500).json({message: "STOP IT! YOU'RE HURTING ME!"})
    });
});

router.get('/', restricted, (req, res) => {
  User.find()
    .select('-password')
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
