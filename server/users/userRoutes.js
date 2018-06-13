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

router.post('/', (req, res) => {
  const newUser = { username, password, race } = req.body;
  User.create(newUser)
  .then(user => {
    res.status(201).json(user);
  })
  .catch(err => {
    res.status(500).json(err);
  })
})

module.exports = router;
