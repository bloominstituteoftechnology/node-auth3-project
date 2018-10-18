const helmet = require('helmet');
const express = require('express');
const cors = require('cors');
const routes = require('../routes/routes.js');

module.exports = server => {
    server.use(helmet());
    server.use(express.json());
    server.use(cors());
    server.use('/', routes);
}