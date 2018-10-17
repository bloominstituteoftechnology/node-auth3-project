const express = require('express');
const helmet = require('helmet');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./data/dbConfig.js');

const server = express();
const port = 9000;

server.use(express.json());
server.use(helmet());

// Test:
server.get('/', (req, res) => {
    res.send('Its Alive!');
  });

server.listen(port, () => {
    console.log(`\n ===== Listening on Port ${port} =====\n`);
});
