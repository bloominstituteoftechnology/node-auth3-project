const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('./data/dbConfig');
const jwt = require('jsonwebtoken');

const server = express();

server.use(express.json());

const port = 8000;
server.listen(port, () => {console.log(`API server runnning on ${port]}`)});
