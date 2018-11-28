// Imports of middlewares
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const express = require('express');

const corsConfig = {
  origin: 'http://localhost:8000',
  credentials: true
};

const middlewareConfig = server => {
  server.use(express.json());
  server.use(morgan('dev'));
  server.use(cors(corsConfig));
  server.use(helmet());
};

module.exports = middlewareConfig;
