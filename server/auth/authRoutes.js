const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../users/User');


router.post('/register', function(req, res) {
  User.create(req.body)
    .then(({ username, race }) => {
      const token = generateToken(user);
      // we destructure the username and race to avoid returning the hashed password

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

// function restricted(req, res, next) {
//   const token = req.headers.authorization;

//   if (token) {
//     jwt.verify(token, secret, (err, decodedToken) => {
//       // req.jwtPayload.decodedToken = decodedToken;
//       if (err) {
//         return res
//           .status(401)
//           .json({ message: 'you shall not pass! not decoded' });
//       }

//       next();
//     });
//   } else {
//     res.status(401).json({ message: 'you shall not pass! no token' });
//   }
// }

// router.get('/api/users', restricted, (req, res) => {
//   User.find({})
//     .select('username')
//     .then(users => {
//       res.status(200).json(users);
//     })
//     .catch(err => {
//       return res.status(500).json(err);
//     });
// });

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
