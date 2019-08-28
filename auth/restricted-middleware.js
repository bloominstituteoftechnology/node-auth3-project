const bcrypt = require('bcryptjs');

const Users = require('../users/users-model.js');
const secrets = require('../config/secrets.js');
const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {

  const token = req.headers.authorization;

  if (token){
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken)=> {

      if(err){
       res.status(401).json({message: 'what the hek'});
      }else{
        req.decodedJwt = decodedToken;
        next();
      }
    })
   } else{
      res.status(401).json({message: 'no soup for you'});
    }

  };

//   const tokenHeader = req.headers.authorization;

//   if(tokenHeader){
//     const tokenStrings = tokenHeader.split("");
//     if(tokenStrings[0].toUpperCase() === 'BEARER'&& tokenStrings[1]){
//       jwt.verify(token, secrets.jwtSecret, (err, decodedToken)=>{
//         if(err){
//           res.status(401).json({message: 'error verifying token', error:err})
//         }else{
//           req.decodedJwt = decodedToken;
//           next();
//         }
//       });
//     } else{
//       res.status(401).json({message: "invalid scheme, no token"})
//     }
//   } else {
//     res.status(401).json({message: 'missing Authorization header'});
//   }

// };


















   