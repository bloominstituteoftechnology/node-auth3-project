
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('./data/dbConfig.js');

const app = express();

app.use(express.json());
app.use(cors());

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    department: user.department,
  }
  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: '1hr'
  }
  return jwt.sign(payload, secret, options)
}

app.post('/api/register', (req, res) => {
  const creds = req.body;

  const hash = bcrypt.hashSync(creds.password, 10);

  creds.password = hash;

  db('users').insert(creds).then(ids => {
    res.status(201).json(ids);
  }).catch(err => json(err));
});


app.post('/api/login', (req, res) => {
  const creds = req.body;
  db('users')
    .where({ username: creds.username })
    .first()
    .then(user => {
      if(user && bcrypt.compareSync(creds.password, user.password)){
        const token = generateToken(user);
        res.status(200).json(token);
      }else{
        res.status(401).json({ message: 'You Shall Not Pass!!!!' })
      }
  }).catch(err => res.status(404).json({ error:"Weird error", err }))
});

app.get('/api/users', protected, checkRole('manager'), (req, res) => {
  db('users')
    .select('id', 'username', 'department')
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));  
});

function protected(req, res, next) {
  const{ authentication: token} = req.headers;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken)=>{
      if(err){
        res.status(401).json({ message: 'invalid token' })
      }else{
        req.decodedToken = decodedToken;
        next();
      }
    })
  }else{
    res.status(401).json({ message: 'No Token Provided' })
  }
}



function checkRole(department) {
  return function(req, res, next){
    if (req.decodedToken && req.decodedToken.department.includes(department)){
      next();
    } else {
      res.status(403).json({ message:'you have no access to this resource' })
    }
  }
}

module.exports = app;   