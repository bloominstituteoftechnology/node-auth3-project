const router = require('express').Router();

const User = require('../users/User');
const jwt = require('jsonwebtoken');
const secret = 'toss me, but dont tell the elf'

const getToken = (user) => {
  const options = {
    expiresIn: '1h'
  }
  //sign the token
  const payload = { name: user.username, race: user.race }
  return jwt.sign(payload, secret, options);
}

router.post('/register', (req, res) => {
  User.create(req.body)
    .then(({ username, race }) => {
      const token = getToken({ username, race })
      res.status(201).json({ username, race });
    })
    .catch(err => res.status(500).json(err));
});

router.post('/login', (req, res) => {
  const user = req.body
  User.findOne({ username: user.username })
    .then(response => {
      //validate password
      response.validatePassword(user.password).then(bcryptResponse => {
        if (bcryptResponse) {
          //get token and save to req
          const token = getToken(response)
          return res.status(200).json({ message: 'You are logged in.', token })
        }
        return res.status(401).json({ message: 'You shall not pass.' })
      })
    })
    .catch(err => res.status(500).json({ message: err }))
})

module.exports = router;
