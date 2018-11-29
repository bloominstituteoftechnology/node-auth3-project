require('dotenv').config();
const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

// create server and define usages
const server = express();
server.use(express.json());
server.use(cors());

// create database
const db = knex(knexConfig.development);

const generateToken = user => {
    const payload = {
        subject: user.id,
        username: user.username,
        department: user.department
    };

    const secret = process.env.JWT_SECRET;
    const options = {
        expiresIn: '1h'
    };

    return jwt.sign(payload, secret, options);
}


// ----------------------------- Endpoints ------------------------------

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
        const user = await db('users').where({ username: loginCreds.username }).first();
        if (user && bcryptjs.compareSync(loginCreds.password, user.password)) {
            // create a token
            const token = generateToken(user);
            res.status(200).json({ message: '*extends the key to the castle*', token});
        } else {
            res.status(401).json({ message: 'Username or password incorrect.'});
        }
    } catch(err) {
        res.status(500).json(err);
    }
});

// middleware for token validation
const protect = (req, res, next) => {
    const token = req.headers.authorization; // token usu. sent in Authorization header
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message: 'Invalid token.'});
            } else {
                req.decodedToken = decodedToken; // when is this used?
                next(); // this is middleware! move it along!
            }
        })
    } else {
        res.status(401).json({ message: 'No token provided.'});
    }
}

// get the list of users for valid users
server.get('/api/users', protect, async (req, res) => {
    try {
        const users = await db('users');
        res.status(200).json(users);
    } catch(err) {
        res.status(500).json(err);
    }
});




const port = 5000;
server.listen(port, () => console.log(`\nServer running on port ${port}\n`));