const loginRouter = require('express').Router();
const bcrypt = require('bcryptjs');
const generateToken = require('../middleware/generate-token')
const Users = require('../data/models/user-model');


loginRouter.post('/', (req, res) => {
    let { username, password } = req.body;
  
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          //a jwt should be generated
          const token = generateToken(user);
          res.status(200).json({
            message: `Welcome ${user.username}!`,
            token
          });
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      })
      .catch(error => {
        res.status(500).json({message: error.message});
      });
  });
  
module.exports = loginRouter;