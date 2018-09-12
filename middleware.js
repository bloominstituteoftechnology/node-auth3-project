const jwt = require('jsonwebtoken');
const config = require('./jwtConfig');

//checks if there's a valid jwt
//injects useful user data if so
//might also merge this into jwtConfig
const protected = (req, res, next) => {
  const token = req.headers.authorization;
  if(token){
    jwt.verify(token, config.SECRET, (err, decodedToken) => {
      if(err){
        res.status(401).json({ message: 'Invalid Token' });
      }else{
        next();
      }
    });
  }else{
    res.status(401).json({ message: 'No token present' });
  }
}

module.exports = { protected };
