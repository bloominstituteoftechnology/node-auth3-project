const express = require('express'); 
const knex = require('knex'); 
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcryptjs'); 
const dbConfig = require('./knexfile'); 

const server = express(); 
const db = knex(dbConfig.development); 

server.use(express.json()); 

server.listen(4400, () => {
    console.log("Server is listening on PORT 4400"); 
}); 



