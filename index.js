const express = require('express');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(cors());

// sanity check here
server.get('/', (req, res) => {
	res.send('It is working!');
});

// endpoints here

// register
server.post('/register', (req, res) => {
  const credentials = req.body;

  const hash = bcrypt.hashSync(credentials.password, 10);
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


const jwtSecret = 'yabba dabba doo!'; // outerscope so it is accessible to

function generateToken(user) {
  const jwtPayload = {
    ...user,
    hello: 'FSW13',
    roles: ['admin', 'root'],
  };
  const jwtOptions = {
    expiresIn: '1m', // expires in 1min
  };

  return jwt.sign(jwtPayload, jwtSecret, jwtOptions);
}

// login
server.post('/login', (req, res) => {
  const creds = req.body;

  db('users')
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user); // generate token for specific user
        res.status(200).json({ welcome: user.username, token });
      } else {
        res.status(401).json({ message: 'username or password is incorrect' });
      }
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

// users
server.get('/users', protected, (req, res) => {
  db('users')
    .select('id', 'username', 'password')
    .then(users => {
      res.json({ users });
    })
    .catch(err => res.send(err));
});

function protected(req, res, next) {
  // authentication tokens are normally sent as a header instead of the body
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        // token verification failed
        res.status(401).json({ message: 'invalid token' });
      } else {
        // token is valid
        req.decodedToken = decodedToken; // any sub-sequent middleware of route handler have access to this
        console.log('\n** decoded token information **\n', req.decodedToken);
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'no token provided' });
  }
};

// listening port
const port = 5000;
server.listen(port, function() {
  console.log(`\n=== API listening on port ${port} ===\n`);
});