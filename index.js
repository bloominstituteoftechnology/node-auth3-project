const express = require("express");
const db = require("./data/db.js");
const bcrypt = require("bcryptjs");
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('Its Alive!');
  });







  const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});