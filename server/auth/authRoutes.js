const router = require('express').Router();
const jwt = require('jsonwebtoken');

const secret = "I am a secret";
const User = require('../users/User');


//generate token function 
function generateToken(username) {
const options = {
  expiresIn: '1hr',
};
const payload = {
  name: username,
};
//signing the token
return jwt.sign(payload, secret, options);
};


router
.post('/register', function(req, res) {
User
.create(req.body)
.then(({ username, race }) => {
  
  const token = generateToken(username);
  console.log(race);
  console.log(token);
    res.status(201).json({ username, race, token });
  })
  .catch(err => res.status(500).json(err));
});


router.post ('/login', (req, res) => {
  const { username, password } = req.body;
  User
  .findOne({ username })
  .then(user => {
    if(user) {
      user
      .validatePassword(password)
      .then(passwordsMatch => {
        if(passwordsMatch) {
          const token = generateToken(username, user.race)
          res.json({ token, message: "have a cookie" })
         
          
        }
        else {
          res.status(401)
          res.json({ message: "invalid credentials" })
        }
      })
      .catch(err => {
        res.status(500).json({ message: "error comparing passwords"})
      })
      }
      else {
        res.status(401).json({ message: "invalid credentials" })
      }
    })
    .catch(err => {
      res.status(500).json({ message: "error" });
  })
})

module.exports = router;
