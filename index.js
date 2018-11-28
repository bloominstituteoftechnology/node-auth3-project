require('dotenv').config(); // yarn add dotenv || npm i dotenv

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs'); // *************************** added package and required it here
const jwt = require('jsonwebtoken');

const db = require('./database/dbConfig.js');

const server = express();

server.use(express.json());
server.use(cors());


server.listen(5000, () => console.log('====================\nrunning on port 5000\n===================='));