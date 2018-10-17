const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const server = express();
const port = 5000;

server.use(express.json(), cors(), helmet());

const jwtSecret = 'Doctor who?';

function generateToken(user) {
  const jwtPayload = {
    ...user,
  };
  const jwtOptions = {
    expiresIn: '30m',
  };
  return jwt.sign(jwtPayload, jwtSecret, jwtOptions);
}

server.listen(port, console.log(`===Server running on ${port} port===\n`));
