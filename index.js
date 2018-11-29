// https://github.com/LambdaSchool/auth-ii/pull/273
require('dotenv').config();

const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const db = knex(knexConfig.development);
const server = express();

const protected = require('./middleware/protected');

server.use(express.json());
server.use(cors());

function createToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        department: user.department
    };
    const secret = process.env.JWT_NOTSECRET;
    const options = {
        expiresIn: '20m'
    };
    return jwt.sign(payload, secret, options);
};

server.get('/', (req, res) => {
    res.json('runnin!')
})

server.get('/api/users', protected, async (req, res) => {
    const users = await db('users').select('id', 'username');
    res.status(200).json(users);
})

server.post('/api/register', async (req, res) => {
    const creds = req.body;
    if (!creds.username || !creds.password || !creds.department) {
        res.status(400).json({ message: 'please fill all required inputs' });
    } else {
        const hash = bcrypt.hashSync(creds.password, 14);
        creds.password = hash;
        const user = await db('users').insert(creds);
        res.status(200).json(user);
    }
})

server.post('/api/login', async (req, res) => {
    const creds = req.body;
    const user = await db('users').where({ username: creds.username }).first();
    if (!user || !bcrypt.compareSync(creds.password, user.password)) {
        res.status(401).json({ message: 'invalid credentials' })
    } else {
        const token = await createToken(user);
        res.status(200).json({ message: 'welcome', token });
    }
})

const port = 3600;
server.listen(port, console.log(`\n ~~~ we can hear you on port ${port} ~~~\n`));