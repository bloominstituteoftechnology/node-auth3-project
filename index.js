const express = require('express');

const db = require('./data/db.js');

const server = express();

server.use(express.json());

// Endpoints go here

server.listen(() => console.log('API is running on 8000'));