const express = require('express');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(cors());

// sanity check here
server.get('/', (req, res) => {
	res.send('It is working!');
});

// endpoints here

// register


// listening port
const port = 5000;
server.listen(port, function() {
  console.log(`\n=== API listening on port ${port} ===\n`);
});