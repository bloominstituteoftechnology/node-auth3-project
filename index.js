const express = require('express');

const knex = require('knex');

const knexConfig = require('./knexfile');

// We use the db constant to interact with our database.
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());

//add the basic code to create our Express server and have a default / endpoint we can use to test that our server is responding to requests.
server.use('/', (req, res) => res.send('API up and running!'));












server.listen(9000, ()=> console.log('API running on port 9000'));