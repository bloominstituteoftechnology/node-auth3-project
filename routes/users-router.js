const usersRouter = require('express').Router();
const restricted = require('../middleware/restricted-middleware')
const Users = require('../data/models/user-model');

usersRouter.get('/', restricted,  (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

module.exports = usersRouter;