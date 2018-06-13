const router = require('express').Router();
const jwt = require('jsonwebtoken');
const session = require('express-session');

const secret = "toss me, but don't tell the elf!!";

const User = require('../users/User');

router.get('/logout', (req, res) => {
  console.log(req.session)
  if(req.session){
    req.session.destroy(err => {
      if(err){
        res.status(400).json({ error: 'Error logging out' })
      } else {
        res.status(200).json({ message: `Goodbye!` })
      }
    })
  } else {
    res.status(401).json({ error: 'Error logging out' })
  }
})

router.post('/register', function(req, res) {
  User.create(req.body)
    .then(({ username, race }) => {
      // we destructure the username and race to avoid returning the hashed password

      // then we assemble a new object and return it
      res.status(201).json({ username, race });
    })
    .catch(err => res.status(500).json(err));
});

router.post('/login', function(req, res) {
  const { username, password } = req.body;
  User.findOne({ username })
    .then(user => {
      if(user) {
        user 
          .validatePassword(password)
          .then(passwordMatch => {
            if(passwordMatch){
              //generate token
              const token = generateToken(user);
              //send token to client
              res.status(200).json({ message: `welcome ${username}!`, token })
            } else {
              res.status(401).json({ error: "Invalid Credentials" })
            }
          })
          .catch(err => {
            res.status(500).json({ error: err.message })
          })
      } else {
        res.status(401).json({ error: "Invalid Credentials" })
      }
    })
    .catch(err => {
      res.status(500).json({ error: err.message })
    })
})

function generateToken(user) {
  const options = {
    expiresIn: '1h',
  };
  const payload = { name: user.username };

  //sign the token
  return jwt.sign(payload, secret, options);
}

module.exports = router;
