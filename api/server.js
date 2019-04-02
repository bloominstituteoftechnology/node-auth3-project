const express = require('express');

const helmet = require('helmet');
const logger = require('morgan');
const cors = require('cors');

const server = express();

server.use(express.json(), helmet(), cors());
server.use(logger('dev'));

server.get('/', (req, res) => {
    res.send("With Great Power, Comes Great Responsibility");
});

module.exports = server;