const express = require('express');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcryptjs');

const server = express();
const dbConfig = require('./knexfile');
const db = knex(dbConfig.development);

server.use(express.json());

server.listen(4000, () =>{
    console.log('Server is up and running m,y dude');
})