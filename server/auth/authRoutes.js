const router = require('express').Router();
const User = require('../users/User');
const { generateToken } = require('./authHelpers');

router.post('/register', function(req, res) {
  User.create(req.body)
    .then((user) => {
      // we destructure the username and race to avoid returning the hashed password
      const token = generateToken(user);
      const { username, race } = user;
      // then we assemble a new object and return it
      res.status(201).json({ username, race, token });
    })
    .catch(err => res.status(500).json(err));
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  User.findOne({username})
    .then(user => {
      if (user) {
        user.validatePassword(password)
          .then(isValid => {
            if (isValid) {
              const token = generateToken(user);
              res.status(200).json({ "Welcome": "Login Successful", token});
            } else {
              res.status(401).json({ error: "Login Failed."});
            }
          })
          .catch(err => {
            console.log(`${user.username} Validation Error:`,err);
            res.status(401).json({ error: "Login Failed."});
          });
      } else {
        res.status(401).json({ error: "Login Failed."})
      }
    })
})

module.exports = router;
