require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./database/dbConfig.js');

const server = express();

server.use(express.json());
server.use(cors());

// FUNCTIONS!!!!!!!!!!!!!!!!!
function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    department: user.department, //added manually here; normally would come from db
  }

  //const secret = 'afoiu2389u_caiocja;l3?vu80vnqa909jk&claksma';
  const secret = process.env.JWT_SECRET;

  const options = {
    expiresIn: '1h',
  }
  return jwt.sign(payload, secret, options)
}

function protected(req, res, next) {
  //token manually sent in the Authorization header
  const token = req.headers.authorization;

  if (token) {
    //is valid
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if(err) {
        //token is invalid
        res.status(401).json({ message: 'token invalid' })
      } else {
        //token is valid
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    //bounced, is invalid
    res.status(401).json({ message: 'no token provided (protected)'})
  }
}

// ENDPOINTS!!!!!!!!!!!!!!!!

//create endpoint for registration
server.post('/api/register', (req,res) => {
  //grab username and password from body
  const creds = req.body;

  //hash the password
    //generate the hash from the user's password
  const hash = bcrypt.hashSync(creds.password, 14)//rounds is 2^X
    //override the user.password with the hash
  creds.password = hash;
  //save the user to the database
  db('users')
  .insert(creds)
  .then(ids => {
    res.status(201).json(ids);
  })
  .catch(err => res.json({message:"attempt registration again", err}))
})

server.post('/api/login', (req,res) => {
  //grab username and password from body
  const creds = req.body;

  db('users')
    .where({ username: creds.username })
    .first()
    .then(user => {
      if(user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);
        console.log('token:', token);
        res.status(200).json({message: 'you made it!', token})
      } else {
        res.status(401).json({message: 'incorrect inputs'})
      }
    })
    .catch(err => res.json({message: 'no'}))
})

server.get('/api/users', protected, (req, res) => {
  //if they are logged in, provide access to users
  db('users')
    .select('id', 'username', 'password') // added password to the select****
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send({message:"you are not able to view this", err}));
});


// server working?
server.get('/', (req, res) => {
  res.send('Its Alive!');
});

server.listen(4400, () => console.log('\nrunning on port 4400\n'));