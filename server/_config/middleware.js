const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const corsOption = {
  origin: 'https://localhost:3000',
  credentials: true,
};

module.exports = function(server) {
  server.use(helmet());
  server.use(morgan('dev'));
  server.use(express.json());
  server.use(cors(corsOption));
};
