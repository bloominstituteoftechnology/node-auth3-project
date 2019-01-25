const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const knex = require('knex');

const db_config = require('./knexfile');

const db = knex(db_config.development);

const dbHelpers = require('./data/dbHelpers.js');

const server = express();
const PORT = 5112;

const secret = 'secretsecret';

server.use(express.json());
server.use(cors());


function generateToken(username) {
    const payload = {
        username: username
    };
    
    const options = {
        expiresIn: '1h',
        jwtid: '12345'
    };

    return jwt.sign(payload, secret, options);
  
}

function protected(req, res, next) {
    const token = req.headers.authorization;
    if(token) {
    jwt.verify(token, secret, (err, decodeToken) => {
        if (err) {
            res.status(401).json({ message: 'Invalid token' })
        } else {
            next();
        }
    });
    } else {
        res.status(401).json({ message: 'No token provided' });
    }
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
    const creds = req.body;
    db('users').where( { username: creds.username }).first()
    .then(user => {
        if (user && bcrypt.compareSync(creds.password, user.password)) {
            const token = generateToken(user);
            res.status(200).json({ token });
        } else {
            res.status(401).json({ message: 'Login Error' });
        }
    })
    .catch(err => res.status(500).send(err));
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
