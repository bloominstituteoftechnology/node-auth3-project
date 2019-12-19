const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const userRoutes = require('./data/userRoutes');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).send('Sanity check');
});

server.use('/', userRoutes);

module.exports = server;