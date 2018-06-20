const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../users/User');
const bcrypt = require('bcrypt');
const secret = "secret1";
function generateToken(user){
  const options = {
    expiresIn: '1h'
  };
  const payload ={
    name: user.username
  };
  return jwt.sign(payload, secret, options);
}

router.post('/register', function(req, res) {
  User.create(req.body)
    .then(({ username, race }) => {
      // we destructure the username and race to avoid returning the hashed password

      // then we assemble a new object and return it
      res.status(201).json({ username, race });
    })
    .catch(err => res.status(500).json(err));
});

router.post('/login', (req, res) => {
  const {username, race, password} = req.body;
  User.findOne({username})
    .then(user => {
      if(user){
        bcrypt.compare(password, user.password)
          .then(pwMatch => {
            console.log(pwMatch);
            if(pwMatch){
              const {username, race} = user
              const token = generateToken(user)
              res.status(200).json({username, token})
            }else {
              res.status(401).json({error: "wrong pw"})
            }
          })
          .catch(err => {
            res.status(404).json({error: "please try again."})
          })
      }
    })
    .catch(err => {
      res.status(500).json({error: err.message})
    })
})
//sagar: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2FnYXIiLCJpYXQiOjE1MjkwMTI4MjMsImV4cCI6MTUyOTAxNjQyM30.QtyLWGdj5apMBJck47zr3OaueGVqf8Tc4soYhWYyW0U

module.exports = router;
