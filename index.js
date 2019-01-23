const express = require('express')
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./data/dbConfig.js');

const server = express();
const PORT = 4040;

server.use(express.json(), cors());

server.listen(PORT, () => console.log(`Running on ${PORT}`));