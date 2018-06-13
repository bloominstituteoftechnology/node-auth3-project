const router = require('express').Router();

const User = require('../users/User');

const jwt = require('jsonwebtoken');
const secret = 'london paris england france';


router.post('/register', function (req, res) {
  User.create(req.body)
    .then(({ username, race }) => {
      // we destructure the username and race to avoid returning the hashed password

      // then we assemble a new object and return it
      res.status(201).json({ username, race });
    })
    .catch(err => res.status(500).json(err));
});

function generateToken(user) {
  const options = {
    expiresIn: '45m',
  }
  const payload = { name: user.username };
  return jwt.sign(payload, secret, options);
}

router
  .post('/login', (req, res) => {
    const { username, password } = req.body;

    User.findOne({ username })
      .then(user => {
        if (user) {
          console.log(password);
          user.validatePassword(password)
            .then(passwordMatch => {
              if (passwordMatch) {
                const token = generateToken(user);
                res.status(200).json({ message: `Welcome ${username}!`, token })
              } else {
                res.status(401).send('invalid credentials')
              }
            })
            .catch(err => {
              res.json({ 'error': err });
            });
        } else {
          res.status(401).send('invalid attempt');
        }
      })
      .catch(err => {
        res.send(err);
      })
  })


module.exports = router;
