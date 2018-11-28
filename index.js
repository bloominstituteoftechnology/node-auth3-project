require('dotenv').config(); // yarn add dotenv || npm i dotenv

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs'); // *************************** added package and required it here
const jwt = require('jsonwebtoken');

const db = require('./database/dbConfig.js');

const server = express();

server.use(express.json());
server.use(cors());


// POST /api/register
server.post('/api/register', (req, res) => {
    const creds = req.body;
    const hash = bcrypt.hashSync(creds.password, 14);

    creds.password = hash;

    db('users')
    .insert(creds)
    .then(ids=> {
        res.status(201).json({message:'user added', ids});
    })
    .catch(err => json(err));
})

// GET /api/login

// GET /api/users


//GET /
server.get('/', (req, res) => {
    res.send('Its Alive!');
  });



server.listen(5000, () => console.log('====================\nrunning on port 5000\n===================='));