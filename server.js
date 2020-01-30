const express = require('express');

const router = require('./router.js');

const server = express();

server.use(express.json());
server.use('/api', router);

server.get('/', (req, res) => {
    res.send("It's alive!");
  });

module.exports = server;