const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./data/db');

const server = express();

server.use(express.json());

server.get('/', (req,res) => {
  res.status(200).json({message: "Welcome to Auth-II"})
})

// server.get('/setname', (req,res) => {
//   res.session.username = 'Mark';
//   res.send(`Okay, looks like you're set as ${res.session.username}`);
// });

// server.get('/getname', (req, res) => {
//   const name = req.session.username;
//   res.send(`Hello, ${name}!`);
// })

server.post('/register', (req, res) => {
  const user = req.body;

  const hash = bcrypt.hashSync(user.password, 14);
  user.password = hash;

  db('users')
    .insert(user)
    .then(ids => {
      db('users')
        .where({id: ids[0]})
        .first()
        .then(user => {
          const token = generateToken(user);

          res.status(201).json(token);
        })
    })
    .catch(err => {
      res.status(500).json({errorMessage: `${err}`})
    })
})

const secret = 'Snow White';

const generateToken = user => {
  const payload = {
    username: user.username
  }

  const options = {
    expiresIn: `1h`,
    jwtid: `123567890`
  }

  return jwt.sign(payload, secret, options);
}

function protected(req, res, next) {
  const token = req.headers.authorization;

  if(token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      req.jwtToken = decodedToken;
      next();
    });
  } else {
    res.status(401).json({ error: `Hey, looks like you don't have authorization to be here. Go back and try again.`})
  }
}

server.post('/login', (req, res) => {
  const credentials = req.body;

  db('users')
    .where({ username: credentials.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(credentials.password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({message: `Welcome, ${user.username}`})
      } else {
        res.status(401).json({ error: 'Incorrect credentials. Please try again. Also, "YOU SHALL NOT PASS!"'})
      }
    })
})

server.get('/users', protected, (req, res) => {
  db('users')
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

const port = 8123;
server.listen(port, () => {
  console.log(`API running on http:localhost/${port}`);
})