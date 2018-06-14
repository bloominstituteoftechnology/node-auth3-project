const express = require('express');
const mongoose = require('mongoose'); 
const cors = require('cors');
const jwt = require('jsonwebtoken'); 

const db = require('./_config/db');
const setupMiddleware = require('./_config/middleware');
const setupRoutes = require('./_config/routes');
const User = require('./users/User');

const server = express();
const secret = "toss me, but don't tell the elf!";

const corsOptions = {
  origin: 'http://localhost:3000', 
  credentials: true,
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
    .catch(error => res.status(500).json({ error: error.message })); 
}); 

server.post('/api/login', (req, res) => {
  const { username, password, race } = req.body; 
  
  User.findOne({ username })
    .then(user => {
      if(user) {
        user
          .validatePassword(password)
          .then(passwordsMatch => {
            if(passwordsMatch) {
              const token = generateToken(user); 

              res.status(200).json({ message: `welcome ${username}!`, token});
            } else {
              res.status(401).send('invalid credentials');
            }
          })
          .catch(err => {
            res.send('error comparing passwords');
          });
      } else {
        res.status(401).send('invalid credentials');
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

  return jwt.sign(payload, secret, options);
}

function restricted(req, res, next) {
  const token = req.headers.authorization;

  if(token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      // req.jwtPayload(decodedToken); 
      if(err) {
        res.status(401).json({ message: 'you shall not pass! not decoded' });
      }

      next();
    });
  } else {
    res.status(401).json({ message: 'you shall not pass! no token' });
  }
}

// function verifyToken(token) {
//   jwt.verify(token, secret, (err, decodedToken) => {
//     if (err) {
//       return false; 
//     }
//     return true; 
//   });
// }

// function restricted(req, res, next) {
//   const token = req.headers.authorization;

//   if (token) {
//     const isTokenValid = verifyToken(token);
//     if (isTokenValid) {
//       next ();       
//     } else {
//       res.status(401).json({ message: 'you shall not pass!' }); 
//     }
//   } else {
//     res.status(401).json({ message: 'you shall not pass! no token' }); 
//   }
// }


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

// const port = process.env.PORT || 5500; 

// mongoose
//   .connect('mongodb://localhost/authii')
//   .then(() => {
//     console.log('n=== Connected to MongoDB ===');
//     server.listen(port, (req, res) => {
//       console.log(`\n=== API up on port ${port} ===\n`);
//     });
//   })
//   .catch(err => 
//     console.log('\n=== Error connecting to MongoDB, is it running? ===\n', err)
//   );

db.connectTo('authii')
  .then(() => {
    console.log('\n... API Connected to authii Database ...\n');
    server.listen(5500, () =>
      console.log('\n=== API running on port 5500 ===\n')
    );
  })
  .catch(err => {
    console.log('\n*** ERROR Connecting to MongoDB, is it running? ***\n', err);
  });
