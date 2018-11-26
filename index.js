const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./dbConfig');
const port = process.env.PORT || 9000;

const server = express();

server.use(express.json());

server.listen(port, () => {
  console.log(`\n === Server Listening on port ${port} === \n`);
});
