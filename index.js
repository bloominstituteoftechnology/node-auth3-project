const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const session = require('express-session');

const db = require('./data/dbHelpers.js');

const server = express();

server.use(express.json());
server.use(cors());

const PORT = 5500;

server.post();

server.post();

server.post();

server.listen(PORT, console.log(`Now listen on port ${PORT}`));