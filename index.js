const express = require('express'); 
const knex = require('knex'); 
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcryptjs'); 
const dbConfig = require('./knexfile'); 


 const server = express(); 
 const db = knex(dbConfig.development); 
 
 server.use(express.json()); 

 const secret = 'secret'
 
 server.get('/', (req, res) => {
    res.send('Test');
});

 server.listen(3000, () => {
    console.log("Server is listening on PORT 3000"); 
}); 