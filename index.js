const express = require('express');
const db = require('./data/db');

const port = 5555;

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send('The server is up and running.')
});


server.listen(port, function() {
  console.log(`\n ==== Web API listening on http://localhost:${port} ==== \n`);
});