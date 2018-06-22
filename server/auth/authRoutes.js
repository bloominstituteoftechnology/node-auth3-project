const router = require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('../users/User');
const secret = 'Secret makes a woman woman...'

function generateToken(user) {
  const options = {
    expiresIn: '1h',
  };
  const payload = { name: user.username };
  return jwt.sign(payload, secret, options);
}


router.post('/register', function(req, res) {
  User
    .create(req.body)
    .then(({ username, race }) => {
      // we destructure the username and race to avoid returning the hashed password
      const token = generateToken({ username, race });

      // then we assemble a new object and return it
      res.status(201).json({ username, race, token });
    })
    .catch(err => res.status(500).json(err));
});

router.post('/login', (req, res) => {
  const { username, password, race } = req.body;
  User
    .findOne({ username })
    .then(user => {
      user
        .validatePassword(password)
        .then(pwdMatched => {
          if(pwdMatched) {
            const token = generateToken(user);
            res.status(200).json({ message: `Welcome ${username}!`, token })
          } else {
            res.status(401).send('Invalid Credentials')
          }
        })
        .catch(error => {
          res.send(error)
        })
    })
})


module.exports = router;
