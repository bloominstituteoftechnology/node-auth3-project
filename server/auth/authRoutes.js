const router = require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('../users/User');
const { secret } = require('../secret.json');

router.post('/register', function(req, res) {
  User.create(req.body)
    .then(({ username, race }) => {
      const payload = { username, race };
      const options = { expiresIn: '1h' };
      const token = jwt.sign(payload, secret, options);

      res.status(201).json({ username, race, token });
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
