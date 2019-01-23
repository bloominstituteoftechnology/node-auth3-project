const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const knex = require('knex');

const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());

const secret = 'heydontlook'

function generateToken(user) {
  const payload = {
    username: user.username,
  };

  const options = {
    expiresIn: '1h',
    jwtid: '12345' // jti
  };

  return jwt.sign(payload, secret, options);
}

server.get('/', (req, res) => {
  res.send(`We're here`);
})

server.listen(3000, () => console.log('\nRunning on port 3000\n'))
