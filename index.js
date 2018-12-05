require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('./database/dbconfig.js');

const server = express();

server.use(express.json());
server.use(cors());


server.post('/api/register', (req, res) => {
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 14);
  creds.password = hash;
  db('users')
    .insert(creds)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => res.json(err));
})



server.listen(8000, () => console.log('\nrunning on port 8000\n'));