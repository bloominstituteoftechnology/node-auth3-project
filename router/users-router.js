const router = require('express').Router();

const Users = require('../data/userdb.js');
const restricted = require('../data/restricted-middleware.js');

router.get('/', restricted,  (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
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
