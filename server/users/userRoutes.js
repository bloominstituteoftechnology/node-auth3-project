const router = require('express').Router();
const secret = "toss me, but don't tell the elf!";
const jwt = require('jsonwebtoken');

const User = require('./User');

router.get('/', restricted, (req, res) => {
  User.find({})
    .select('-password')
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

function restricted(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      // req.jwtPayload(decodedToken);
      if (err) {
        return res
          .status(401)
          .json({ message: 'you shall not pass! not decoded' });
      }

      next();
    });
  } else {
    res.status(401).json({ message: 'you shall not pass! no token' });
  }
}


// function restricted(req, res, next) {
//   const token = req.headers.authorization;
//   console.log(token)
//   if(token) {
//     jwt.verify(token, secret, (err, decodedToken) => {
//       req.jwtPayload(decodedToken);
//       if(err) {
//         return res
//           .status(401)
//           .json({ message: 'you shall not pass! not decoded' })
//       }
//       next();
//     })
//   } else {
//     res.status(401).json({ message: 'you shall not pass! no token' })
//   }
// }

// router.get('/logout', (req, res) =>{
//   if (req.session) {
//       req.session.destroy(error => {
//           if(error){
//               res.send('error logging out')  
//           } else {
//               res.status(200).send("Have a nice day!")
//           }
//       })
//   }
// })

module.exports = router;
