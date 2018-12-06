const express = require('express'); 
const helmet = require('helmet');
const knexConfig = require('./knexfile');
const knex = require('knex');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const jwt = require('jsonwebtoken');

// require('dotenv').config(); 

const server = express();

//Initialize db
const db = knex(knexConfig.development);

//Connect Middleware to Server 
server.use(helmet(), express.json());

erver.use(cors());

function generateToken(user) {
    const payload = {
      subject: user.id,
      username: user.username,
      department: user.department,
    };
    const secret = 'holla natalia. Claro que si corazon. Ya voy.';
    const options = {
        expiresIn: '1m',
    };
        return jwt.sign(payload, secret, options);
}

// used to authenticate user access
function protected(req, res, next) {
    const token = req.headers.authorization; //affixed to the header as Authorization

    // valid token exsists
    if (token) {
      jwt.verify(token, jwtSecret, (err, decodedToken) => {
        // invalid token
        if (err) {
          res.status(401).json({ message: 'invalid token' });
        } else {
          req.decodedToken = decodedToken;
          next();
        }
      });
    } else {
      // nonexsistent token
      res.status(401).json({ message: 'not token provided' });
    }
  }


// SANITY CHECK
server.get('/', (request, response) => {
    response.send("Let's GO!")
});

//==================

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./database/dbConfig.js');

const server = express();
server.use(express.json());
server.use(cors());

// Middleware and helper functions

function generateToken(user) {
    const payload = {
      subject: user.id,
      username: user.username,
      department: user.department,
    };

const secret = process.env.JWT_SECRET;
const options = {
    expiresIn: '1m',
  };
  return jwt.sign(payload, secret, options);
}

function protected(req, res, next) {
    const token = req.headers.authorization; // convention is to save token in header > authorization
  
    if (token) { // token valid
      jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) { // token invalid
          res.status(401).json({ message: 'invalid token' });
        } else { // token is valid
          req.decodedToken = decodedToken;
          next();
        }
      });
    } else { // rejected
      res.status(401).json({ message: 'not token provided' });
    }
  }

  //POST login

  server.post('/api/login', (req, res) => {
    const creds = req.body;
  
    db('users')
      .where({ username: creds.username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(creds.password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({ message: 'Benvenuto!', token });
        } else {
          res.status(401).json({ message: 'No access!' });
        }
      })
      .catch(err => res.json(err));
  });
  
  //  Protected
  // GET users
  server.get('/api/users', protected, (req, res) => {
    db('users')
      .select('id', 'username', 'password', 'department') // ***************************** added password to the select
      .then(users => {
        res.json(users);
      })
      .catch(err => res.send(err));
  });

//  POST register

server.post('/api/register', (req, res) => {
    const creds = req.body; // ges user name and pass from body
    const hash = bcrypt.hashSync(creds.password, 8);  // produce hash
    creds.password = hash; // turns pass into hash

    db('users') // user added to db
      .insert(creds)
      .then(ids => {
        res.status(201).json(ids);
      })
      .catch(err => json(err));
  });

 
  server.listen(8888, () => console.log('\nrunning on port 8888\n'));