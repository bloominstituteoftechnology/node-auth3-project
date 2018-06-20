const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const corsOptions = {
  credentials: true, // sets the Access-Control-Allow-Credentials CORS header
};



module.exports = function(server) {
  server.use(helmet());
  server.use(morgan('dev'));
  server.use(express.json());
  server.use(cors(corsOptions));
  //server.use(cors());
};
