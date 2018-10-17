const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

function logger(req, res, next){
    console.log(`${req.method} to ${req.url}`);
    next();
}

server.use(logger);

server.get('/', (req, res) => {
  res.send('Its Alive!');
});

// TODO

// /api/register POST


// /api/login POST


// /api/users GET

const port = 9000;
server.listen(port, () => console.log(`\nrunning on port ${port}\n`));