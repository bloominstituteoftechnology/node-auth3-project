const router = require('express').Router();

const User = require('./User');


//base prefix is '/api/users'

router.get('/', (req, res) => {
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
