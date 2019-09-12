const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('morgan');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(logger('dev'));

module.exports = server;
