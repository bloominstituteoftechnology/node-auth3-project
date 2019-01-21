const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const server = express();
const PORT = 5000;

server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
    res.send('API is Active');
});

server.listen(PORT, () => console.log(`\nServer running on port ${PORT}\n`));