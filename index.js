require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./data/dbConfig');

const server = express();

server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
  res.json({ message: 'Its Alive!' });
});

server.listen(3300, () => console.log('\nrunning on port 3300\n'));
