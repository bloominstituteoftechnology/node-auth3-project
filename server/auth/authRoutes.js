const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../users/User');

const secret = 'secret';
const generateToken = (user) => {
  const options = {
    expiresIn: "1h"
  }
  const payload = {name: user.username};
  return jwt.sign(payload, secret, options);
};

router.post('/register', function(req, res) {

  User.create(req.body)
    .then(({ username, race, password }) => {
      // we destructure the username and race to avoid returning the hashed password

      // then we assemble a new object and return it
      res.status(201).json({ username, race, password });
    })
    .catch(err => res.status(500).json(err));
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  User.findOne({ username })
    .then(user => {
      console.log(user);
    
        user
          .validatePassword(password)
          .then(passwordsMatch => {
            if (passwordsMatch) {
              const token = generateToken(user);
              res.status(200).json({
                message: `welcome ${username}!`, token
              })
            } else {
              res.status(401).send('invalid credentials')
            }
          })
          .catch(err => res.send('error comparing passwords'));
      }
    )
    .catch(err => res.send(err));
});

module.exports = router;
