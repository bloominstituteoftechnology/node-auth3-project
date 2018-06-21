const router = require('express').Router();
const jwt = require('jsonwebtoken');

const secret = "Chill bro, no one makes it out alive";
const User = require('../users/User');

function generateToken(username) {
  const tokenOptions = {
    expiresIn: '1day',
  };
  const payload = {
    name: username,
  };
  return jwt.sign(payload, secret, tokenOptions);
}

router.post('/register', function(req, res) {
  User.create(req.body)
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
              const token = generateToken(username, user.race);
                res.json({ token, message: "And a cookie for you Glen Coco, You go Glen CoCo!"});
            } else {
              res.status(401).json({message: "Invalid Credentials" });
            }
          })
          
          .catch(err => {
            res.status(500).json({message: "WHAT HAVE YOU DONE!?!?!?!"});
          });
      }
    });
});

module.exports = router;
