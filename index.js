const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./database/dbConfig');

const server = express();

server.use(express.json());
server.use(cors());

server.get('/', (req, res) =>{
    res.send('running')
})

server.listen(3300, () => console.log('listening on port 3300'))
