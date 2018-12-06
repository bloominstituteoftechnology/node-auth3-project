require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const loginRouter = require('./loginRouter');
const registerRouter = require('./registerRouter');
const userRouter = require('./userRouter');
const cors = require('cors');
const jwt = require('jsonwebtoken');

module.exports = server => {
  server.use(cors());
  server.use(express.json());
  server.use(logger('combined'));
  server.use(jwt());
  server.use('/api/register', registerRouter);
  server.use('/api/login', loginRouter);
  server.use('/api/users', userRouter);
}