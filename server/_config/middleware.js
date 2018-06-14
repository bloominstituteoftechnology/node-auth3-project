const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: [], // authorized HTTP verbs -> if ommit allow all HTTP verbs
  credentials: true,
};

module.exports = function(server) {
  server.use(helmet());
  server.use(morgan('dev'));
  server.use(express.json());
  server.use(cors(corsOptions));
};
