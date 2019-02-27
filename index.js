require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // installed this library

const db = require('./database/dbConfig.js');
const Users = require('./users/users-model.js');

const secret = process.env.JWT_SECRET || 'add a third table for many to many relationships';

const server = express();
server.use(helmet());
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
res.send("It's alive!");
});


const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n**** Running on port ${port} ****\n`));

//