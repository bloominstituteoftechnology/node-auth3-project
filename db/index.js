const express = require('express');
const server = express();
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

server.use(express.json());
server.use(cors);

const port = 8000;
server.listen( port, console.log(`===Server is running on port ${port}===`));
