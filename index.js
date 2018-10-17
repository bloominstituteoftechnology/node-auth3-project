const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./data/dbConfig.js');

const server = express();

const port = 9000;

server.use(cors());
server.use(morgan('combined'));
server.use(express.json());

server.listen(port, ()=> console.log(`API running on port ${port}`));
