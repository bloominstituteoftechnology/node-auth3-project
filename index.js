const express = require('express');
const db = require('./data/db');
const port = 8000;

const server = express();

server.use(express.json());



server.listen(port, () => console.log(`\n==== API is running on port ${port} ====\n`));