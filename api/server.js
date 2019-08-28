const express = require('express');
const authorize = require('./auth/authorize');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const server = express();

// MIDDLEWARE
server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
server.use(cors());

// CUSTOM ERROR-HANDLING MIDDLEWARE
server.use('/', (err, req, res, next) => {
  res.status(500).json({
    error: err.message
  });
});
