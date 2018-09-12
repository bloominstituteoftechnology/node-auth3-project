const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const db = require('./database/dbConfig.js');

const server = express();
server.use(express.json());
server.use(cors());


// Endpoints 
server.get('/', (req, res) => {
    res.send('Server online');
});

server.post('/api/register', (req, res) => {
    const creds = req.body;


})


server.listen(3900, () => console.log('\nrunning on port 3900\n'));