require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('./database/dbconfig.js');

const server = express();

server.use(express.json());
server.use(cors());





server.listen(8000, () => console.log('\nrunning on port 8000\n'));