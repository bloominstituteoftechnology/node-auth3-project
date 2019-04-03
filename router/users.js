const express = require('express');
const router = express.Router();
const userDb= require('../data/userdb.js');
const restricted = require('../data/restricted-middleware.js');

router.get('/', restricted, withRole('role'), (req, res) => {
  userDb.find()
      .then(users => {
          res.json(users);
      })
      .catch(err => {
          res.status(500).send(err);
      })
});
function withRole(role){
  return function(req, res, next){
    if(
      req.decodedJwt &&
      req.decodedJwt.roles && 
      req.decodedJwt.roles.includes(role)
      ) {
       next();
    }else{
      res.status(403).json({message: 'you have no power here'})
    }
  }
}
module.exports = router;