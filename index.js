const express = require('express');
const helmet = require('helmet');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const knex = require('knex');
const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);
const server = express();

server.use(helmet());
server.use(express.json());

const port = 8000;
server.listen(port, () => console.log(`API running on port ${port}`));

// checker endpoint
server.get('/', (request, response) => {
    response.send('Server initialized.');
});