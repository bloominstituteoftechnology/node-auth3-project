const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

function logger(req, res, next){
    console.log(`${req.method} to ${req.url}`);
    next();
}

server.use(logger);

server.get('/', (req, res) => {
  res.send('Servin\' USA!');
});

/**************************************************/
// JWT FUNCTION INITIALIZATION
/**************************************************/
const jwtSecret = 'now$this&is@podracing';

function generateToken(user) {
  const jwtPayload = {
      ...user,
  };
  const jwtOptions = {
    expiresIn: '1h',
  };

  return jwt.sign(jwtPayload, jwtSecret, jwtOptions);
}

/**************************************************/
// REGISTER
/**************************************************/

server.post('/api/register', async (req, res) => {
    try {
    const credentials = req.body;
    const hash = bcrypt.hashSync(credentials.password, 14);
    credentials.password = hash;
  
    const newUserId = await db('users').insert(credentials);
    // log user in on registration by passing a new token for the new user
    try {
        const newUser = await db('users').where({id: newUserId[0]}).first();
        const token = generateToken(newUser);
        return res.status(201).json({ token });
    } catch(err) {
        return res.status(404).json({err});
    }
    } catch(err) {
    return res.status(500).json({err});
    }
})

/**************************************************/
// LOGIN
/**************************************************/

server.post('/api/login', (req, res) => {
    const creds = req.body;
  
    db('users')
      .where({ username: creds.username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(creds.password, user.password)) {
          const token = generateToken(user); // create new token for user on login
          res.status(200).json({ welcome: user.username, token }); // pass token to client
        } else {
          res.status(401).json({ message: 'YOU! SHALL NOT! PAAASS!' });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ err });
      });
  });

/**************************************************/
// PROTECTED MIDDLEWARE
/**************************************************/

  function protected(req, res, next) {
    // store auth token from req header
    const token = req.headers.authorization;
    if (token) {
      jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err) {
          // token verification failed
          res.status(401).json({ message: 'Invalid Token' });
        } else {
          // token is valid, add decodedToken to req parameters
          req.decodedToken = decodedToken; 
          // any req after this ^ will have the decoded token *** HANDLE WITH CARE ***
          console.log('\n** Decoded Token **\n', req.decodedToken);
          next();
        }
      });
    } else {
      res.status(401).json({ message: 'No Token Provided' });
    }
  }

/**************************************************/
// CHECK DEPARTMENT MIDDLEWARE
/**************************************************/

  // checkDepartment middleware can be passed to restrict access to only certain department users
  // this is done by passing the middleware checkDepartment('dept') where dept is the desired user type
  // e.g. checkDepartment('admins') will restrict the response to only admin authorized users 
  function checkDepartment(dept) {
    return function(req, res, next) {
      if (req.decodedToken && req.decodedToken.department.includes(dept)) {
        next();
      } else {
        res.status(403).json({ message: 'FORBIDDEN! You are not authorized to view this!' });
      }
    };
  }

/**************************************************/
// GET USERS
/**************************************************/

// /api/users GET with protected middleware
server.get('/api/users', protected, (req, res) => {
    /*** STRETCH ***/
    // server will only send users that are of the same type as the logged in user
    db('users')
    .where({department: req.decodedToken.department})
      .select('id', 'username', 'department')
      .then(users => {
        res.json({ users });
      })
      .catch(err => {
        console.log(err); 
        res.status(500).json({err})
      })
});

// GET calls to /api/users/admin will show all information (including hash-passwords!) to admin users only
server.get('/api/users/admin', protected, checkDepartment('admins'), (req, res) => {
    db('users').select('id', 'username', 'password', 'department')
    .then(users => {
        res.json({users});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({err});
    })
})

/**************************************************/
// SERVER LISTEN
/**************************************************/

const port = 9000;
server.listen(port, () => console.log(`\nrunning on port ${port}\n`));