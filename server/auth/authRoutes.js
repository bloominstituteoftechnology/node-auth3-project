const router = require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('../users/User');

router.post('/register', function(req, res) {
  User.create(req.body)
    .then(({ username, race }) => {
      // we destructure the username and race to avoid returning the hashed password

      // then we assemble a new object and return it
      res.status(201).json({ username, race });
    })
    .catch(err => res.status(500).json(err));
});

router.post('/login', (req, res) => {
  const { username, password, race } = req.body;
  User.findOne({ username })
  .then(user => {
      if(user) {
      user
      .validatePassword(password)
      .then(passwordsMatch => {
        if(passwordsMatch) {
            const token = generateToken(user);//generate token
        res.status(200).json({ message: `Welcome ${username}!`, token });
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
    expiresIn: '1h'
  };
  const secret = "toss me, but don't tell the elf!";
  const payload = { name: user.name };
  return jwt.sign(payload, secret, options);
  //sign the token
}

module.exports = router;
