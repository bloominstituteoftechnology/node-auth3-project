const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const db = require('./dbHelpers');

const server = express();

server.use(express.json());
server.use(cors());

// root endpoint to make sure server is working
server.get('/', (req, res) => {
  res.send('Server is live!');
});

const PORT = 5500;
server.listen(PORT, () => {
  console.log(`\n=== Server is up and running on port ${PORT} ===\n`);
});
