const express = require('express');
const bcrypt = require ('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./database/dbConfig.js')

const server = express();


// function protected(req, res, next) {}

server.use(express.json());

const port = 3300;

server.post('/register', function(req, res) {
  const user = req.body;

  const hash = bcrypt.hashSync(user.password, 14);
  user.password = hash;

  db('users')
  .insert(user)
  .then(function(ids) {
      db('users')
      .where({ id: ids[0] })
      .first()
      .then(user => {
        // generate the token
        const token = generateToken(user);
        //attach the token to the response
        res.status(201).json(user);
      });
  })
  .catch(function(error) {
      res.status(500).json({ error });
  });
});

const secret = 'nobody tosses a dwarf!';

function generateToken(user) {
    const payload = {
        username: user.username
    };

    const options = {
        expiresIn: '1h',
    };

    return jwt.sign(payload, secret, options);
}

server.post('/login', function(req, res) {
    const credentials = req.body;

    db('users')
    .where({ username: credentials.username })
    .first()
    .then(function(users) {
        if (user && bcrypt.compareSync(credentials.password, user.password)) {
            // generate the token
            const token = generateToken(user);
          // req.session.username = user.username;

          //attach token to the response
            res.send(token);
        } else {
            return res.status(401).json({ error: 'Incorrect credentials' });
        }
    })
    .catch((function(error) {
        res.status(500).json({ error });
    }));
});

function protected(req, res, next) {
  const token = req.headers.authorization;  
}

server.get('/users', protected, (req, res) => {
    db('users')
    .then(users => {
        res.json(users);
    })
    .catch(err => res.send(err));
});

server.listen(port, () => console.log(`\n running on port ${port} \n`));
