const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const User = require('./users/User.js');

const db = require('./_config/db');
const setupMiddleware = require('./_config/middleware');
const setupRoutes = require('./_config/routes');

const server = express();
const secret = "Can you keep a secret?";

const corsOptions = {
  origin: 'http://localhost:3000', // allow only the React app to connect
  credentials: true, // sets the Access-Control-Allow-Credentials CORS header
};

server.use(express.json());
server.use(cors(corsOptions));
setupMiddleware(server);
// setupRoutes(server);

server.post('/api/register', (req, res) => {
  User.create(req.body)
    .then(user => {
        const token = generateToken(user);

        res.status(201).json({ username: user.username, token });
    })
    .catch(err => res.status(500).json(err));
});

server.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username })
    .then(user => {
      if(user) {
        user
          .validatePassword(password)
          .then(passwordsMatch => {
            if (passwordsMatch) {
              // generate token
              const token = generateToken(user);

              // send token to the client
              res.status(200).json({ message: `Welcome, ${username}!`, token });
            } else {
              res.status(401).send('Invalid credentials');
            }
          })
          .catch(err => {
            res.send('Error comparing passwords');
          });
      } else {
        res.status(401).send('Invalid credentials');
      }
    })
    .catch(err => {
      res.send(err);
    });
});

function generateToken(user) {
  const options = {
    expiresIn: '1h',
  };
  const payload = { name: user.username };

  // sign the token
  return jwt.sign(payload, secret, options);
}

function restricted(req, res, next) {
  const token = req.headers.authorization;

  if(token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      // req.jwtPayload(decodedToken);
      if (err) {
        res
          .status(401)
          .json({ message: 'Not decoded. You shall not pass!' });
      }

      next();
    });
  } else {
    res
      .status(401)
      .json({ Message: 'No token. You shall not pass!' });
  }
}

server.get('/api/users', restricted, (req, res) => {
  User.find({})
    .select('username')
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});

const port = process.env.PORT || 5500;

mongoose
  .connect('mongodb://localhost/auth-ii')
  .then(() => {
    console.log('\n ===== Connected to MongoDB ===== \n');
    server.listen(port, (req, res) => {
      console.log(`\n ===== API up on port ${port} ===== \n`);
    });
  })
  .catch(err =>
    console.log('\n ===== Error connecting to MongoDB, is it running? ===== \n', err)
  );

  // setupMiddleware(server);
  // setupRoutes(server);

// db.connectTo('authii')
//   .then(() => {
//     console.log('\n... API Connected to authii Database ...\n');
//     server.listen(5500, () =>
//       console.log('\n=== API running on port 5500 ===\n')
//     );
//   })
//   .catch(err => {
//     console.log('\n*** ERROR Connecting to MongoDB, is it running? ***\n', err);
//   });