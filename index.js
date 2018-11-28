const express = require('express');

const db = require('./database/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/api', (req, res) => {
    res.send('Its Alive!');      
})

server.listen(3300, () => console.log('\nrunning on port 3300\n'));