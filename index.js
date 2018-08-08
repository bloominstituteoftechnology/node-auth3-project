const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('./data/db.js');
const jwt = require('jsonwebtoken');

const server = express();

server.use(express.json());

// Endpoints go here

server.listen(() => console.log('API is running on 8000'));