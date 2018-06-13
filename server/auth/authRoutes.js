const router = require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('../users/User');

const secret = "there is nothing to fear, but fear itself";

router.post('/register', function(req, res) {
  User.create(req.body)
    .then(({ username, race }) => {
      // we destructure the username and race to avoid returning the hashed password
      const token = createToken(user)
      // then we assemble a new object and return it
      res.status(201).json({ username, race, token });
    })
    .catch(err => res.status(500).json(err));
});

router.post('/login', (req, res) => {
  const {username, password} = req.body;
  User
    .findOne({username})
    .then(user => {
      if(user){
        user
        .validatePasswor(password)
        .then(passwordMatch => {
         if(passwordMatch){
          const token = createToken(user)

          res.status(200).json({message: `welcome ${username}!`, token});
         } else {
           res.status(401).send('invalid username and password');
         }
        })
        .catch(err => {
          res.send('error comparing passwords')
        })
      } else {
        res.status(401).send('invalid credentials')
      }
    })
    .catch(err => {
      res.send(err)
    })
})


function createToken(user){
  const options = {
    expires: '30mins'
  };
  const payload = {name: user.username};

  return jwt.sign(payload, secret, options);
}

module.exports = router;
