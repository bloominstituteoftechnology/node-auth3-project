require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./database/dbConfig');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());  


//middleware to restrict users 
function restricted(req, res, next) {
  const token = req.headers.authorization;
  if(token){
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: 'invalid token'});
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'no token provided' });
  }
}

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    role: user.department
  };

  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: '1m',
  };

  return jwt.sign(payload, secret, options);
}

//users can login
server.post('/api/login', (req,res) => {
  const creds = req.body;

  db('users')
    .where({ username: creds.username })
    .first()
    .then(user => {
      if(user && bcrypt.compareSync(creds.password, user.password)){
        const token = generateToken(user);
        res.status(200).json({ message: 'Welcome!', token})
      } else  {
        res.status(401).json({ message: 'you shall not pass' })
      }
    })
    .catch( error => res.json(error))
})

//registers new users
server.post('/api/register', (req, res) => {
  //gets username and password
  const creds = req.body;
//generates the hash
  const hash = bcrypt.hashSync(creds.password, 14);
//overwrite the password with the hash
  creds.password = hash;
//save user to DB
  db('users')
    .insert(creds)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(error => json(error))
})


//only logged in users should see this list of users
server.get('/api/users', restricted, (req,res) => {
  db('users')
    .select('id', 'username', 'password', 'department')
    .where({ department: req.decodedToken.role })
    .then(users => {
      res.json(users);
    })
    .catch(error => res.send(error))
})



//test to see if it's live
server.get('/', (req,res) => {
  res.send('It\'s Alive');
})

const port = 7000;
server.listen(port, () => console.log(`server is running on port ${port}`));