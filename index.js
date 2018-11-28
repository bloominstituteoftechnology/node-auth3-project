const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('./database/dbConfig.js');

const server = express();

server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
    res.json("it's alive!")
});

server.listen(3900, () => console.log('\nrunning on port 3900\n'))