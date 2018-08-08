const express = require('express');
const server = express();

const errors = require('./middleware/errors');

server.use(express.json());
const PORT = 3000;

// base endpoints here
server.get('/', (req, res) => {
  res.send('it is working...');
});

// error handling
server.use(errors);

// not found - 404
server.use((req, res) => {
  res.status(404).send(`<h1>404: resource "${req.url}" not found</h1>`);
});

server.listen(
  PORT,
  console.log(`\n=== Web API Listening on http://localhost:${PORT} ===\n`),
);
