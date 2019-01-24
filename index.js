const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const knex = require('knex');

const db_config = require('./knexfile');

const db = knex(db_config.development);

const dbHelpers = require('./data/dbHelpers.js');

const server = express();
const PORT = 5112;

server.use(express.json());

function generateToken(username) {
    const payload = {
        username: username
    };
    const secret = 'secretsecret';
    const options = {
        expiresIn: '1h',
        jwtid: '12345'
    };

    return jwt.sign(payload, secret, options);
  
}

function protected(req, res, next) {
    next();
}

server.post('/api/register', (req,res) => {
    const creds = req.body;
    const hash = bcrypt.hashSync(creds.password, 10);
    creds.password = hash;

    db('users')
    .insert(creds)
    .then(ids => {
        const id = ids[0];

        db('users')
        .where({ id })
        .first()
        .then(user => {
            const token = generateToken(user);
            res.status(201).json({ id: user.id, token })
        })
        .catch(err => res.status(500).send(err));
    })
    .catch(err => res.status(500).send(err));
  });
  
  server.post('/api/login', (req, res) => {
    const user = req.body;
    dbHelpers.loginUser(user)
    .then(users => {
      if (users.length && bcrypt.compareSync(user.password, users[0].password)) {
        res.status(200).json({ message: 'Success!' });
      } else {
        res.status(400).json({ error: 'Invalid username or password' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Login Error' });
    })
  });

  server.get('/api/users', protected, (req, res) => {

      dbHelpers.findUsers()
      .then(users => {
        res.json(users);
      })
      .catch(err => res.send(err));
  });

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
