const router = require('express').Router();
const User = require('./User');
const authenticate = require('../_config/middleware').authenticate;

router.get('/', authenticate, (req, res) => {
  const { race } = req.tokenPayload;
  User.find({ race: race })
    .select('-password')
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
