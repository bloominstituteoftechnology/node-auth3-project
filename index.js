const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./database/dbConfig.js');

const server = express();

server.use(express.json());
server.use(cors());

const jwtSecret = 'nobody tosses a dwarf!'; // moved out, due to scope
function generateToken(user) {
  const jwtPayload = {
    ...user,
    hello: 'Jonathan',
    roles: 'admin'
  };
  const jwtOptions = {
    expiresIn: '1m'
  };
  
  return jwt.sign(jwtPayload, jwtSecret, jwtOptions);
}

server.get('/', (req, res) => {
  res.send('Its Alive!');
});

// implemented this
server.post('/api/register', (req, res) => {
  const credentials = req.body;

  const hash = bcrypt.hashSync(credentials.password, 10);
  credentials.password = hash; // hash the password beforehand

  db('users')
    .insert(credentials)
    .then(ids => {
      const id = ids[0];
      res.status(201).json({ newUserId: id });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.post('/api/login', (req, res) => {
  const creds = req.body;

  db('users')
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);
        // on succcess, create a new JWT with user id as subject
        res.status(200).json({ welcome: user.username, token });
      } else {
        // if failure, send back correct HTTPCODE with message...
        res.status(401).json({ message: 'You shall not pass!' });
      }
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

// protect this route, only authenticated users should see it
// pass in our checkRole
server.get('/api/users', protected, checkRole('admin'), (req, res) => {
  db('users')
    .select('id', 'username', 'password', 'department')
    .then(users => {
      console.log(users, 'users');
      res.json({ users });
    })
    .catch(err => res.send(err));
});

function protected(req, res, next) {
  // auth tokens are usually sent as part of the header, not body
  // if user is not logged in, respond with correct httpcode and message...
  const token = req.headers.authorization;

  if (token) 
  {

    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: 'You shall not pass!' });
      } else {
        req.decodedToken = decodedToken; 
        console.log(req.decodedToken, 'decodedToken from req object');
        // destructure --> any subsequent middleware of route handlers has access to this
        // so now... '/users' has access to the req.decodedToken
        next();
      }
    })

  } else {
    res.status(401).json({ message: 'No token provided' });
  }
}

function checkRole(role) {
  return function(req, res, next) {
    /* 
      - checking in the protected function, if req.decodedToken exists 
      - and also checking if the decodedToken.roles includes the role given when we invoke the function.
    */
    
    if (req.decodedToken && req.decodedToken.roles.includes(role)) {
      next();
    } else {
      res.status(403).json({ message: 'you shall not pass! forbidden' });
    }
  };
}

server.listen(3450, () => console.log('\nrunning on port 3450\n'));





