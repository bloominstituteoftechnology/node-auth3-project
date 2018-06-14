const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../users/User');

function createToken(user){
  const options = {
    expires: '30mins'
  };
  const payload = {name: user.username};

  return jwt.sign(payload, secret, options);
}

const secret = "there is nothing to fear, but fear itself";

router.post('/register', function(req, res) {
  User.create(req.body)
    .then(({ username, race }) => {
      // we destructure the username and race to avoid returning the hashed password

      // then we assemble a new object and return it
      res.status(201).json({username, race });
    })
    .catch(err => res.status(500).json(err));
});

router.post('/login', (req, res) => {
    const {username, race, password} = req.body;
      User.findOne({username})
      .then(user => {
        if(user){
          bcrypt.compare(password, user.password)
            .then(matchPw => {
              console.log(matchPw);
              if(matchPw){
                const {username, race} = user
                const token = createToken(user)
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

module.exports = router;
