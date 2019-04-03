const bcrypt = require('bcryptjs');
const Users = require('../users/users-model.js');

module.exports = (req, res, next) => {
  try {
    if(req && req.session && req.session.user){
      next();
    }else{
      res.status(401).json({message : "Invalid credentials"})
    }   
  } catch (error) {
    res.status(500).json({message: 'you broke the it'})
  }
  
};
