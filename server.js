const express = require('express');
const route = require('./route/router.js');
const cors = require('cors');

const server = express();



    
server.use(cors());
server.use(express.json());


server.use('/api', route);

server.get('/', (req, res) => {

    res.json({api:'up'})

})



module.exports = server;