require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./data/dbConfig');
const server = express();



// Middleware
server.use(express.json());
// JWT Config
function generateToken(user) {
    const payload = {
        userId: user.id,
        username: user.username
    };
    const secret = process.env.JWT_SECRET;
    const options = {
        expiresIn: '5m'
    };
    return jwt.sign(payload, secret, options);
}
// protected route
function protected(req, res, next) {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message: 'Token is invalid', err });
            } else {
                req.decodedToken = decodedToken;
                next();
            }
        });
    } else {
        res.status(401).json({ message: 'No token provided.' });
    }
}

// POST register
server.post('/api/register', async(req, res) => {
    const userData = req.body;
    if (!userData.username || !userData.password) {
        return res
            .status(400)
            .json({ message: 'Username and password are required.' });
    }
    try {
        const usenameTaken = await db('users')
            .where({ username: userData.username })
            .first();
        if (usenameTaken) {
            return res.status(401).json({ message: 'That username is taken.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'There was an error accessing the db.' });
    }
    const hash = bcrypt.hashSync(userData.password, 6);
    userData.password = hash;
    try {
        const userId = await db('users').insert(userData);
        res.status(201).json(userId);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong registering.' });
    }
});


// POST LOGIN
server.post('/api/login', async(req, res) => {
    const loginData = req.body;
    if (!loginData.username || !loginData.password) {
        return res
            .status(400)
            .json({ message: 'Username and password are required.' });
    }
    try {
        const user = await db('users')
            .where({ username: loginData.username })
            .first();
        if (user && bcrypt.compareSync(loginData.password, user.password)) {
            const token = generateToken(user);
            res.status(200).json({ message: 'welcome!', token });
        } else {
            res.status(401).json({ message: 'Password is wrong.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong logging in.' });
    }
});



// GET USERS
server.get('/api/users', protected, async(req, res) => {
    try {
        const users = await db('users').select('id', 'username', 'password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'There was an error getting the users.' });
    }
});
server.get('/', (req, res) => {
    res.send('Hello there.');
});


server.listen(3300, () => console.log('Server stared on port 3300'));