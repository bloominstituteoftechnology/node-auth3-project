const express=require('express');
const server=express();
const knex=require('knex');
const cors=require('cors');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const dbConfig=require('./knexfile.js');
const dbr=require('./db/authiiModel.js');
const db=knex(dbConfig.development);
const PORT=process.env.PORT || 8000;

server.use(express.json());
server.use(cors());
const secret='caffeine';

function generateToken(user){
  const payload={
    subject: user.id
  }
  const options={
    expiresIn:'1h',
    jwtid:'12345', //jti
  }
  return jwt.sign(payload,secret,options);
}

function protected(req,res,next){
  //read token string from authorization header
  //verify the token
  const token=req.headers.authorization;
  if(token){
  jwt.verify(token,secret, (err,decodedToken)=>{
    if(err){
      //token is invalid
      res.status(401).json({message:'you shall not pass!'})
    }else{
      //token is valid
      req.username=decodedToken.username;
      next();
    }
  })}else{
    console.log('no token');
    res.status(401).json({message:'no token provided'})
  }
  
}

  server.post('/api/register', (req, res) => {
    const creds=req.body;
    const hash=bcrypt.hashSync(creds.Password, 14);
    creds.Password=hash;
    dbr.registerUser(creds).then(id=>res.status(201).json(id)).catch(err=>res.status(500).json(err))

});


server.post('/api/login', (req, res) => {
    const creds=req.body;
    dbr.getUser(creds.userName).then(user=>{
if(user && bcrypt.compareSync(creds.Password, user.Password)){
    //generate token
  const token=generateToken(user);
    //attach token to response
    
    res.status(200).json({[user.id]:token})
}else{
    //either username is not found or password is wrong
    res.status(401).json({message:'you shall not pass'})
}}).catch(err=>res.json(err))
});

server.get('/api/users', protected, (req,res)=>{
  
  dbr.getUsers().then(users=>res.json(users).status(201)).catch(err=>res.json(err))

})

server.listen(PORT, () => console.log(`API running on port ${PORT}`));