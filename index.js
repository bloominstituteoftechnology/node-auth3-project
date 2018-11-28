const express = require('express');
const bcrypt = require('bcryptjs');

const db = require('./database/dbConfig');

const server = express();
const port = 8080;

// test API
server.get('/', (_, res) => {
  res.send('API is live!')
});

server.listen(port, () => console.log(`Listening to port: ${port}`));
