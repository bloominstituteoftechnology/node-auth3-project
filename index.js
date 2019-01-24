const express = require('express');
const bcryptjs = require('bcryptjs');
const logger = require('morgan');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const server = express();
// Database 
const db = require('./dbHelper');
//PORT
const PORT = 5500;
//Server
server.use(express.json());
server.use(logger('dev'));
server.use(cors());
//Initial get request
server.get('/', (req,res) => {res.json(`Server is and running`); })
// Post - Register
server.post('/api/register', (req,res) => {
     const user = req.body;
     db.insert(user)
       .then( ids => {
          console.log(ids);
          res.json(ids)
       })
})

server.listen(PORT, () => {
   console.log(`Server is running at localhost://${PORT}`);
})