require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const bcrypt = require('bcryptjs'); // added
const jwt = require('jsonwebtoken');
const knexConfig = require('../knexfile.js');

const server = express();

const db = knex(knexConfig.development);

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
  res.send('hopefully everyone is up in here, up in here.');
});

server.post('/register', (req, res) => {
  const userInfo = req.body;
  // userinfo consists of username, name, and password
  const hash = bcrypt.hashSync(userInfo.password, 12);

  userInfo.password = hash;

  db('users')
    .insert(userInfo)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => res.status(500).json(err));
});

module.exports = server;
