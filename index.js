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
  res.send('Its Alive!');
});

// TODO

// /api/register POST
server.post('/api/register', (req, res) => {
    const credentials = req.body;
  
    const hash = bcrypt.hashSync(credentials.password, 14);
    credentials.password = hash;
  
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

  // setup for jwt creation
  const jwtSecret = 'now$this&is@podracing';

  function generateToken(user) {
    const jwtPayload = {
        ...user
    };
    const jwtOptions = {
      expiresIn: '1h',
    };
  
    return jwt.sign(jwtPayload, jwtSecret, jwtOptions);
  }


// /api/login POST

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
          res.status(401).json({ message: 'you shall not pass!' });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ err });
      });
  });

  // setup protected middleware
  function protected(req, res, next) {
    // store auth token from req header
    const token = req.headers.authorization;
    if (token) {
      jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err) {
          // token verification failed
          res.status(401).json({ message: 'invalid token' });
        } else {
          // token is valid
          req.decodedToken = decodedToken; 
          // any req after this ^ will have the decoded token *** HANDLE WITH CARE ***
          console.log('\n** decoded token information **\n', req.decodedToken);
          next();
        }
      });
    } else {
      res.status(401).json({ message: 'no token provided' });
    }
  }

  // === TODO ===
  /* *** STRETCH *** */
  // setup department middleware
//   function checkDepartment(dept) {
//     return function(req, res, next) {
//       if (req.decodedToken && req.decodedToken.department.includes(dept)) {
//         next();
//       } else {
//         res.status(403).json({ message: 'you shall not pass! forbidden' });
//       }
//     };
//   }


// /api/users GET with protected middleware
server.get('/api/users', protected, (req, res) => {
    db('users')
      .select('id', 'username', 'password')
      .then(users => {
        res.json({ users });
      })
      .catch(err => {
        console.log(err); 
        res.status(500).json({err})
      })
});

const port = 9000;
server.listen(port, () => console.log(`\nrunning on port ${port}\n`));