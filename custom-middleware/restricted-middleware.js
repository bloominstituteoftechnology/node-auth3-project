
const users = require ("../data/model");
const crypt = require("bcryptjs");
const {jwtSecret} = require('../custom-middleware/secret')
const jwt = require("jsonwebtoken")
module.exports=(req,res,next) => {
  const token = req.headers.authorization;
    
  if(token){
    jwt.verify(token,jwtSecret,(err,decodedToken)=>{
      if(err){res.status(401).json({message:'You Shall not pass'})}else{req.decodedJwt=decodedToken;
       next();}
    })
  }else{
    res.status(401).json({message:'You Shall not pass'})
  }
}

   

  