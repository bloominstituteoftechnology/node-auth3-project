const express = require('express');
const cors = require('cors');
const knex = require('knex');

// security dependencies

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// server setup

const server = express();
const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);

// basic GET for server testing

server.get('/api', (req, res) => {
  res.send('Server test successful.');
});

server.post('/register', (req, res) => {
  const credentials = req.body;

  const
})
// server instantiation

const port = 9000;

server.listen(port, () => console.log('Server listening on port 9000.'));
