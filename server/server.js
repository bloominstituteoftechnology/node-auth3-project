const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const endpointsRouter = require('../endpoints/endpoints.js');


const server = express();
server.use(cors());
server.use(express.json());
server.use('/api/', endpointsRouter);
server.use(morgan('dev'));

server.get('/', (req, res) => {
    res.json("it's alive!")
});


module.exports = server;