const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../router/secrets.js').jwtSecret;
const Users= require('../data/userdb');

router.post('/', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token,
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

function generateToken(user){
  const payload = {
    subject: user.id,
    username : user.username,
    roles : ['student', 'ta']
  };
  
  const options ={
    expiresIn : '1d',
  }
  return  jwt.sign(payload, secret, options);
}

module.exports = router;
