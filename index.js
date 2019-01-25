const express = require('express');
const bcrypt = require('bcryptjs');

const userHelper = require('./database/helpers/userHelper');

const server = express();
const port = 8000;

server.use(express.json());

server.post('/api/register', (req, res) => {});

server.post('/api/login', (req, res) => {});

server.get('/api/users', (req, res) => {});

server.listen(port, console.log(`\nWeb API running on port ${port}\n`));
