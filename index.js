// https://github.com/LambdaSchool/auth-ii/pull/273
require('dotenv').config();

const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile');

const db = knex(knexConfig.development);
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.json('runnin!')
})

server.get('/api/users', async (req, res) => {
    const users = await db('users');
    res.status(200).json(users);
})

server.post('/api/register', async (req, res) => {
    const creds = req.body;
    if (!creds.username || !creds.password || !creds.department) {
        res.status(400).json({ message: 'please fill all required inputs' });
    } else {
        const user = await db('users').insert(creds);
        res.status(200).json(user);
    }

})

const port = 3600;
server.listen(port, console.log(`\n ~~~ we can hear you on port ${port} ~~~\n`));