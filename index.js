const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.post('/register', (req, res) => {
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 10);
  creds.password = hash;

  db('users')
    .insert(creds)
    .then(ids => {
      const id = ids[0];
      res.status(201).json({ newUserId: id });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.get('/', (req, res) => res.json('Server is up and running!'));

const port = 6000;
server.listen(port, () => console.log(`API is listening on port ${port}.`));
