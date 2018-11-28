const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile');

// create server and define usages
const server = express();
server.use(express.json());

// create database
const db = knex(knexConfig.development);

// Root endpoint
server.get('/', (req, res) => {
    res.status(200).json({ message: 'At /'});
});

// database endpoints
// register a new user
server.post('/api/register', async (req, res) => {
    const userCreds = req.body;
    try {
        const returned = await db('users').insert(userCreds);
        // need to hash pw
        res.status(200).json(returned);
    } catch(err) {
        res.status(500).json(err);
    }
});



// get the list of users
server.get('/api/users', async (req, res) => {
    try {
        const users = await db('users');
        res.status(200).json(users);
    } catch(err) {
        res.status(500).json(err);
    }
});




const port = 5000;
server.listen(port, () => console.log(`\nServer running on port ${port}\n`));