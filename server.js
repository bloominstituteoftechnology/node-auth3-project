const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./database/dbConfig.js');

const server = express();


server.listen(3300, () => console.log('\nrunning on port 3300\n'));