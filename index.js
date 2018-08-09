const express = require('express');
const jwt = require('jsonwebtoken');
const secret = 'secret';
const cors = require('cors');
const bcrypt = require('bcryptjs');
const db = require('./data/db');
const server = express();

server.use(express.json());
server.use(cors({origin: 'http://localhost:3000', credentials:true}));

function generateToken(user) {
  const payload = {
    username: user.username,
  };

  const options = {
    expiresIn: '1h',
    jwtid: '8728391',
  };

  return jwt.sign(payload, secret, options);
}

function protected(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        return res
          .status(401)
          .json({ error: 'you shall not pass!! - token invalid' });
      }
      req.jwtToken = decodedToken;
      next();
    });
  } else {
    return res.status(401).json({ error: 'you shall not pass!! - no token' });
  }
}

server.get('/api/users', protected, (req, res) => {
  console.log('token', req.jwtToken);
  db('users')
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

server.get('/', (req, res) => {
  res.send('Its Alive!');
});

server.post('/api/register', (req, res) => {
  // save the user to the database
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 14);
  user.password = hash;
  db    
    .insert(user)
    .into('users')
    .then(id => {
      db('users') 
        .then(users => {
          const user = users.pop()
          const token = generateToken(user);
          res.status(201).json({user, token}) 
        })
    })
    .catch(err => {
      res.status(500).json(err);
    });
})
// server.post('/api/register', function(req, res) {
//   const user = req.body;

//   // hash password
//   const hash = bcrypt.hashSync(user.password, 10);
//   user.password = hash;

//   db('users')
//     .insert(user)
//     .then(function(ids) {
//       db('users')
//         .where({ id: ids[0] })
//         .first()
//         .then(user => {
//           // generate the token
//           const token = generateToken(user);
//           // req.session.username = user.username;

//           // attach the token to the response
//           res.status(201).json(token);
//         });
//     })
//     .catch(function(error) {
//       res.status(500).json({ error });
//     });
// });

server.post('/api/login', function(req, res) {
  const credentials = req.body;
  db('users')
    .where({ username: credentials.username })
    .first()
    .then(function(user) {
      if (user && bcrypt.compareSync(credentials.password, user.password)) {
        const token = generateToken(user);
        res.send(token);
      } else {
        return res.status(401).json({ error: 'Incorrect credentials' });
      }
    })
    .catch(function(error) {
      res.status(500).json({ error });
    });
});

server.listen(8000, () => {
  console.log('API running on port 8000')
});