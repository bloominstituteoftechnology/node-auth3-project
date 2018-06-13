const router = require('express').Router();
const User = require('./User');
const authenticate = require('../_config/middleware').authenticate;

router.get('/', authenticate, (req, res) => {
  User.find()
    .select('-password')
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
