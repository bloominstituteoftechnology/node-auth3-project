const router = require('express').Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../users/User');


const secret = "Use any string for a secret";


router.post('/register', function(req, res) {
  User.create(req.body)
    .then(({ username, race }) => {
      // we destructure the username and race to avoid returning the hashed password

      const token = generateToken({ username, race });

      // then we assemble a new object and return it
      res.status(201).json({ username, race, token });
    })
    .catch(err => res.status(500).json(err));
});




router.post('/api/login', (req, res) => {
  const { username, password, race } = req.body;

  User.findOne({ username })
    .then(user => {
      if (user) {
        user
          .validatePassword(password)
          .then(passwordsMatch => {
            if (passwordsMatch) {
              // generate token
              const { username, race } = user;
              const token = generateToken({ username, race});

              // send token to the client
              res.status(200).json({ message: `welcome ${username}!`, token });
            } else {
              res.status(401).send('invalid credentials');
            }
          })
          .catch(err => {
            res.send('error comparing passwords');
          });
      } else {
        res.status(401).send('invalid credentials');
      }
    })
    .catch(err => {
      res.send(err);
    });
});



function generateToken(user) {
  const options = {
    expiresIn: '1h',
  };
  const payload = { name: user.username, race: user.race };

  // sign the token
  return jwt.sign(payload, secret, options);
}


function restricted(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      req.jwtPayload(decodedToken);
      if (err) {
        return res
          .status(401)
          .json({ message: 'you shall not pass! not decoded' });
      }

      next();
    });
  } else {
    res.status(401).json({ message: 'you shall not pass! no token' });
  }
}



module.exports = router;
