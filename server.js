const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const sessions = require('express-session');
const jwt = require('jsonwebtoken');

const dbConfig = require('./knexfile');

const db = knex(dbConfig.development);

const server = express();

server.use(helmet());
server.use(express.json()); // don't forget this

//start server
server.get('/', (req, res) => {
res.send('API Running...');
});

server.listen(9000);