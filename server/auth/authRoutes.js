const router = require('express').Router();
const User = require('../users/User');
const generateToken = require('../_config/middleware').generateToken;

router
  .post('/register', (req, res) => {
    const { username, password, race } = req.body;
    User.create({ username, password, race })
      .then(({ username, race }) => {
        const token = generateToken({
          username: username,
          race: race
        });
        res.status(201).json({ username: username, token });
      })
      .catch(err => res.status(500).json(err));
  })
  .post('/login', (req, res) => {

  })

module.exports = router;
