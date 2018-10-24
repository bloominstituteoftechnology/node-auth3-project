const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const server = express();
const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')




server.use(cors());
server.use(helmet());
server.use(express.json());

server.get('/',(req,res)=>{
  res.send('active')
});
server.get('/api/users',(req,res)=>{

  db('users')
  .select('id','username', 'password')
  .then(users =>{
    res.json(users);
  })
  .catch(err=>{
    res.send(err);
  })
})

server.post('/register',(req,res) =>{
  const credentials = req.body;

//hash
const hash = bcrypt.hashSync(credentials.password,14);
credentials.password = hash;
db('users').insert(credentials)
.then(ids=>{
  const id = id[0];
const token = generateToken(credentials);
  res.status(201).json({newUserId:id, token})
})
.catch(err=>{
  res.status(500).json(err);
});
});

function generateToken(user){
  const jwtpayload ={
    ...user,
    hello:'welcome',
    role: 'admin'
  };
  const jwtSecrect ='nobody';

  const jwtOptions= {
    expiresIn:'3m'
  }
  return jwt.sign(jwtpayload,jwtSecrect,jwtOptions)
}

server.post('/login', (req,res)=>{

  const credentials = req.body;
  console.log(req.body)
  db('users').where({username: credentials.username}).first()
  .then(users => {
    if (users&&bcrypt.compareSync(credentials.password, users.password)){

  const token = generateToken(users);
      res.status(200).json({welcome: users.username, token})
    } else {
      res.status(401).json({
        message:'you shall not pass'
      })
    }
  })
.catch(err=>{
  res.send(err)
});
});

const port=3700;
server.listen(port,()=> {
  console.log(`\n===Api Active On ${port}===\n`)
});
