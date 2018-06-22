const router = require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('../users/User');


router.post('/register', function(req, res) {
  User.create(req.body)
    .then(({ username }) => {
      // we destructure the username and race to avoid returning the hashed password
      const token = generateToken(user);

      // then we assemble a new object and return it
      res.status(201).json({ username, race, token });
    })
    .catch(err => res.status(500).json(err));
});


router.post('/login', (req, res) => {
  const { username, password, race } = req.body;

  User.findOne({ username })
    .then(user => {
      if (user) {
        user
          .validatePassword(password)
          .then(passwordsMatch => {
            if (passwordsMatch) {
              // generate token
              const token = generateToken(user);

              // send token to the client
              res.status(200).json({ message: `what up ${username}!`, token });
            } else {
              res.status(401).send('invalid credentials');
            }
          })
          .catch(err => {
            res.send('error comparing passwords');
          });
      } else {
        res.status(401).send('invalid credentials');
      }
    })
    .catch(err => {
      res.send(err);
    });
});

//----TOKEN FUNCTION------
function generateToken(user) {
  const options = {
    expiresIn: '1h',
  };
  const secret = "return of the Mack";
  const payload = { name: user.username };

  // sign the token
  return jwt.sign(payload, secret, options);
};




module.exports = router;
