require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./database/dbConfig.js');

const server = express();
server.use(express.json());
server.use(cors());

//________ FUNCTIONS / MIDDLEWARE_______

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
    // token is normally sent in the the Authorization header
    const token = req.headers.authorization;

  
    if (token) {
      // is it valid
      jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
          // token is invalid
          res.status(401).json({ message: 'invalid token' });
        } else {
          // token is gooooooooooood
          req.decodedToken = decodedToken;
          next();
        }
      });
    } else {
      // bounced
      res.status(401).json({ message: 'not token provided' });
    }
  }

  ///________________ POST ________________
  server.post('/api/login', (req, res) => {
    const creds = req.body;
  
    db('users')
      .where({ username: creds.username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(creds.password, user.password)) {
          // created a session > create a token
          // library sent cookie automatically > we send the token manually
          const token = generateToken(user);
          res.status(200).json({ message: 'welcome!', token, });
        } else {
          // either username is invalid or password is wrong
          res.status(401).json({ message: 'you shall not pass!!' });
        }
      })
      .catch(err => res.json(err));
  });
 
server.post('/api/register', (req, res) => {
    // grab username and password from body
    const creds = req.body;
  
    // generate the hash from the user's password
    const hash = bcrypt.hashSync(creds.password, 4); // rounds is 2^X
  
    // override the user.password with the hash
    creds.password = hash;
  
    // save the user to the database
    db('users')
      .insert(creds)
      .then(ids => {
        res.status(201).json(ids);
      })
      .catch(err => json(err));
  });

  /// ********** PROTECTED ************
  //______________ GET users________________
  server.get('/api/users', protected, (req, res) => {
    db('users')
      .select('id', 'username', 'password', 'department') // ***************************** added password to the select
      .then(users => {
        res.json(users);
      })
      .catch(err => res.send(err));
  });

  server.listen(5300, () => console.log('\nrunning on port 5300\n'));