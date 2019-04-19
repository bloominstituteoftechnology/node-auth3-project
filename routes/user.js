const express = require('express');
const router = express.Router();
const crypt = require('bcryptjs')
const restricted = require('../custom-middleware/restricted-middleware');
const jwt = require("jsonwebtoken")

const db = require('../data/dbConfig.js');
const Users = require('../data/model')
const {jwtSecret} = require('../custom-middleware/secret')
const errors = { 
  '19':'Another entree has the same value no duplicates'
}

router.post('/register',(req,res)=>{
  let user = req.body;
  const hash = crypt.hashSync( user.password,10);
  user.password=hash;
  console.log(user.password)
  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
      .catch(error => {res.status(500).json(error)});
});

router.post('/login', (req, res) => {
  let { user, password } = req.body;

  Users.findBy({ user })
    .first()
    .then(user => {  
      if (user && crypt.compareSync(password,user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: `Welcome ${user.user}!, have a token`,token});
      } else {
        console.log (password)
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get('/', restricted, (req, res) => {
  Users.find()
    
    .then(user => {
      res.json(user);
    })
    .catch(err => res.send(err));
});

function generateToken(user){
  const payload = {
    subject: user.id,
    user:user.user,
    roles:['student'],
  }
  const options = {
    expiresIn:'1d'
  }
  return jwt.sign(payload,jwtSecret,options);
}


module.exports = router;