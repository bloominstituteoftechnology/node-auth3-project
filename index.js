const express = require('express');
const server = express();

const knex = require('knex');
const dbConfig = require('./knexfile');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const db = knex(dbConfig.development)
const PORT = process.env.PORT || 6789;

server.use(express.json());



server.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
})