const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./db/dbConfig.js');

const server = express();
const port = 7000;

server.use(express.json(), helmet(), cors())

server.route('/')
    .get((req, res) => {
        return res.send('It works')
    })

server.listen(port, () => {
    console.log(`\n===Live on port ${port}===\n`)
})