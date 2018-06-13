const router = require('express').Router();

const User = require('./User');

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

router.post('/register', (req, res) => {
  const { username, password, race } = req.body;
  User.create({ username, password, race })
    .then(response => {
      res.status(200).json('You are know registered');
    })
    .catch(e => {
      e.statusCode = 500;
      next(e);
    });
});

module.exports = router;
