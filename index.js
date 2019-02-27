require('dotenv').config

const express = require('express')
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./database/dbConfig.js');
const Users = require('./users/users-model.js');

const secret =
  process.env.JWT_SECRET || 'secrets are an illusion'

  const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
  res.send('Auth day 3 api');
});

server.post('/api/register', (req, res) => {
    let user = req.body;
  
    const hash = bcrypt.hashSync(user.password, 10); 

    user.password = hash;
  
    Users.add(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
  function generateToken(user) {
    const payload = {
      subject: user.id, 
      username: user.username,
      department: ['Accounting'],
    };
  
    const options = {
      expiresIn: '1d',
    };
  
    return jwt.sign(payload, secret, options);
  } 

  server.post('/api/login', (req, res) => {
    let { username, password, department } = req.body;
  
    Users.findBy({ username })
      .first()
      .then(user => {
        // check that passwords match
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user); // new
          // return token
          res.status(200).json({
            message: `Welcome ${user.username}!, have a token...`,
            token,
            department: token.department,
          });
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
  
  function restricted(req, res, next) {
    const token = req.headers.authorization;
  
    if (token) {
      // is it valid?
      jwt.verify(token, secret, (err, decodedToken) => {
        if (err) {
          // record the event
          res.status(401).json({ message: "token can not be changed" });
        } else {
          req.decodedJwt = decodedToken;
          next();
        }
      });
    } else {
      res.status(401).json({ you: 'shall not pass!' });
    }
  }
  
  function checkDept(department) {
    return function(req, res, next) {
      if (req.decodedJwt.roles && req.decodedJwt.roles.includes(department)) {
        next();
      } else {
        res.status(403).json({ you: 'you have no power here!' });
      }
    };
  }
  
  server.get('/api/users', restricted, checkDept('Finance'), (req, res) => {
    Users.find()
      .then(users => {
        res.json({ users, decodedToken: req.decodedJwt });
      })
      .catch(err => res.send(err));
  });
  
  server.get('/users', restricted, async (req, res) => {
    try {
      const users = await Users.find();
  
      res.json(users);
    } catch (error) {
      res.send(error);
    }
  });


const port = process.env.PORT || 4000;
server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));