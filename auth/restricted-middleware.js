const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js')
const Users = require('../users/users-model.js');

module.exports = (req, res, next) => {
  //token is commonly sent as the authorization header
  const token = req.headers.authorization;
  if(token){
    //is it valid?
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if(err){
        //token invalid
        res.status(401).json({message: 'The token is invalid'})
      }else {
        //token valid
        req.decodedJwt = decodedToken // make the token available to the rest of the API
        console.log('decoded token', req.decodedToken);
        next();
      }
    })
  } else{
    //no token?
    res.status(401).json({message: 'Only token people are allowed'})
  }
};