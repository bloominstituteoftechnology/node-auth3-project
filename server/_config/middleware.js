const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const URL = 'http://localhost:778'

const corsOptions = {
  origin: URL,
  credentials: true,
}

module.exports = function(server) {
  server.use(helmet());
  server.use(morgan('dev'));
  server.use(express.json());
  server.use(cors(corsOptions));
};
