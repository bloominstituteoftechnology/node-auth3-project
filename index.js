const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const knex = require("knex");
const knexConfig = require("./knexfile.js");
const session = require('express-session');
const jwt = require('jsonwebtoken');

const server = express();
const db = knex(knexConfig.development);

server.use(express.json());
server.use(cors());

// jwt setup
const jwtSecret = 'The mongoose flies at midnight';
function generateToken(user) {
const jwtPayload = {
  ...user,
};
const jwtOptions = {
  expiresIn: '1h',
};
  return jwt.sign(jwtPayload, jwtSecret, jwtOptions);
}
//

// middleware to handle protected parts of server
function protected(req, res, next) {
  const token = req.headers.authorization;
   if (token) {
      jwt.verify(token, jwtSecret, (err, decodedToken) => {
          if (err) {
              res.status(401).json({ message: 'invalid token!' });
          } else {
              req.decodedToken = decodedToken;
              next();
          }
      })
  } else {
      res.status(401).json({ message: 'no token provided' })
  }
}

// GET //
server.get('/', (req, res) => {
  res.send("Server functional");
});

server.get('/api/users', protected, (req, res) => {
  db('users').select('id', 'username', 'department').then(users => {
      res.json(users);
  })
  .catch(err => {
      console.log(err);
      res.json({error: err});
  })
})
////////

// POST //
server.post('/api/register', (req, res) => {
  const credentials = req.body;
  const hash = bcrypt.hashSync(credentials.password, 10);
  credentials.password = hash;
   db('users')
    .insert(credentials)
    .then(ids => {
      res.status(201).json({ newUserId: ids[0] });
    })
    .catch(err => {
      if (err.errno === 19) {
        res.status(400).json({ error: 'Username taken.' });
      } else {
        res.status(500).json(err);
      }
    });
});

server.post('/api/login', (req, res) => {
  const creds = req.body;
   db('users')
  .where({username: creds.username})
  .first()
  .then(user => {
      if(user && bcrypt.compareSync(creds.password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({ message: `User logged in: ${user.username}`, token });
      } else {
          res.status(401).json({ message: "You shall not pass!"});
      }
  })
  .catch(err => res.status(500).json({err}));
})
/////////

const port = 5000;
server.listen(port, () => console.log(`API running on ${port}`)) 