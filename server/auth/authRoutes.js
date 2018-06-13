const router = require('express').Router();
const jwt = require('jsonwebtoken')

const User = require('../users/User');
const secret = "toss me, but don't tell the elf!";


function generateToken(user) {
  const options = {
    expiresIn: '1h',
  };
  const payload = { name: user.username, race: user.race };
  // sign the token
  return jwt.sign(payload, secret, options);
}

router.post('/register', function (req, res) {
  User.create(req.body)
    .then(({ username, race }) => {
      // we destructure the username and race to avoid returning the hashed password
      let token = generateToken({ username, race })
      // then we assemble a new object and return it
      res.status(201).json({ token });
    })
    .catch(err => res.status(500).json(err));
});


router.post('/login', (req, res) => {
  const { username, password } = req.body
  User.findOne({ username })
    .then(user => {
      user
        .validatePassword(password)
        .then(passwordsMatch => {
          let { username, race } = user
          if (passwordsMatch) {
            const token = generateToken({ username, race })
            res.status(201).json({ message: 'You have succesfully logged in!', token })
          } else {
            res.status(401).json({ message: 'Wrong password my friend!' })
          }
        })
    })
    .catch(err => res.status(401).json('message: you shall not pass!'))
})


module.exports = router;
