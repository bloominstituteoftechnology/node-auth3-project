const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const server = express();
const authorize = require('../auth/authorize');
const authRouter = require('../auth/authRouter');
const usersRouter = require('../users/usersRouter');

// MIDDLEWARE
server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
server.use(cors());

// ROUTERS
server.use('/api/auth', authorize, authRouter);
server.use('/api/users', usersRouter);

// CUSTOM ERROR-HANDLING MIDDLEWARE
server.use('/', (err, req, res, next) => {
  res.status(500).json({
    error: err.message
  });
});

module.exports = server;
