const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const knex = require('knex');
const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(cors());

server.get('/', (req , res) => {
    res.send('JSON Web Token Session Starting...');
});

server.listen(3500, () => console.log('\nrunning on port 3500\n'));