const express = require('express');
const cors = require('cors');
const knex = require('knex');

const server = express();
const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);

// basic GET for server testing

server.get('/api', (req, res) => {
  res.send('Server test successful.');
});

// server instantiation

const port = 9000;

server.listen(port, () => console.log('Server listening on port 9000.'));
