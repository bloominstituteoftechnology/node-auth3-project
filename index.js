const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile');
const bcryptjs = require('bcryptjs');

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
// securely register a new user
server.post('/api/register', async (req, res) => {
    const userCreds = req.body;
    const hash = bcryptjs.hashSync(userCreds.password, 2); // should be 13 or higher in production
    userCreds.password = hash;
    try {
        const insertCount = await db('users').insert(userCreds);
        res.status(200).json(insertCount);
    } catch(err) {
        res.status(500).json(err);
    }
});

// securely log a user in
server.post('/api/login', async (req, res) => {
    const loginCreds = req.body;
    try {
        // find the user by the username in the db
        // compare the submitted pw to the pw in the db
        const user = await db('users').where({ username: loginCreds.username }).first();
        console.log('user', user);
        if (user && bcryptjs.compareSync(loginCreds.password, user.password)) {
            // create a token
            res.status(200).json({ message: '*extends the key to the castle*'});
        } else {
            res.status(401).json({ message: 'Username or password incorrect.'});
        }
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