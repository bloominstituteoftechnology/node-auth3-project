require('dotenv').config(); // yarn add dotenv || npm i dotenv

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs'); // *************************** added package and required it here
const jwt = require('jsonwebtoken');

const db = require('./database/dbConfig.js');

const server = express();

server.use(express.json());
server.use(cors());

//MIDDLEWARE
function generateToken(user) {
    const payload = {
        subject: user.id,
        username:user.username,
        roles: ['marketing', 'sales']        
    };

    const secret = process.env.JWT_SECRET;
    const options = {
        expiresIn: '1h',
    };

    return jwt.sign(payload, secret, options)
}


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

// POST /api/login
server.post('/api/login', (req,res) => {
    const creds = req.body;

    db('users')
    .where({ username: creds.username })
    .first()
    .then(user => {
        if (user && bcrypt.compareSync(creds.password,user.password)) {
            const token = generateToken(user);
            res.status(200).json({ message: 'welcome user', token})
        } else {
            res.status(401).json({ message: 'the password or username was incorrect'})
        }
    })
    .catch(err => res.status(500).json(err))
})


// GET /api/users


//GET /
server.get('/', (req, res) => {
    res.send('Its Alive!');
  });



server.listen(5000, () => console.log('====================\nrunning on port 5000\n===================='));