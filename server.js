const express = require('express');

const router = require('./router.js');

const authRouter = require('./authRouter')

const server = express();

server.use(express.json());
server.use('/api', router);
server.use('/api', authRouter);

server.get('/', (req, res) => {
    res.send("It's alive!");
  });

module.exports = server;