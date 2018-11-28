require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./database/dbConfig.js');

const server = express();

server.use(express.json());
server.use(cors());

function generateToken(user) {
  const payload = {
    userId: user.id,
    username: user.username,
    roles: ['sales', 'marketing']
  };
  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: '1h'
  };
  return jwt.sign(payload, secret, options);
}

server.get('/', (req, res) => {
  console.log('firing');
  res.send("It's alive!");
});

const port = 4242;
server.listen(port, function() {
  console.log('\nrunning on port 4242\n');
});
