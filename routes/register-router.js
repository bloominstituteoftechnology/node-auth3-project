const registerRouter = require('express').Router();
const bcrypt = require('bcryptjs');
const generateToken = require('../middleware/generate-token')
const Users = require('../data/models/user-model');

// for endpoints beginning with /api/
registerRouter.post('/', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;

  Users.add(user)
    .then(saved => {
      //a jwt should be generated
      const token = generateToken(user);
      res.status(201).json({ user: saved, token });
    })
    .catch(error => {
      res.status(500).json({message: error.message});
    });
});


module.exports = registerRouter;
