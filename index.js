const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile');

// create server and define usages
const server = express();
server.use(express.json());

// create database
const db = knex(knexConfig.development);

// Root endpoint
server.get('/', (req, res) => {
    res.status(200).json({ message: 'At /'});
});

const port = 5000;
server.listen(port, () => console.log(`\nServer running on port ${port}\n`));