const express = require('express');

const endpointsRouter = require('../endpoints/endpoints.js');
const cors = require('cors');

const server = express();

server.use(express.json());
server.use('/api/', endpointsRouter);
server.use(cors());

server.get('/', (req, res) => {
    res.json("it's alive!")
});


module.exports = server;