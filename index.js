const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const session = require('express-session');

const server = express();

server.use(express.json());
server.use(cors());

const PORT = 5500;

server.listen(PORT, console.log(`Now listen on port ${PORT}`));