// https://github.com/LambdaSchool/auth-ii/pull/273
require('dotenv').config();

const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile');

const db = knex(knexConfig.development);
const server = express();

server.get('/', (req, res) => {
    res.json('runnin!')
})

const port = 3600;
server.listen(port, console.log(`\n ~~~ we can hear you on port ${port} ~~~\n`));