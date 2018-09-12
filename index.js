const express = require('express');
const server = express();
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const dbConfig = require('./knexfile');
const db = knex(dbConfig.development);

server.use(express.json());
server.use(cors());

const secret = 'lambda-school-fsw12';

generateToken = user => {
    const payload = {
        username: user.username,
        department: user.department,
    }
    const options = {
        expiresIn: '4h',
        jwtid: '12345',
    }
    return jwt.sign(payload, secret, options);
}

server.post('/api/register', async (req, res) => {
    const creds = req.body;
    const hash = bcrypt.hashSync(creds.password, 10);
    creds.password = hash;
    if ( !creds.username || !creds.password || !creds.department) {
        res.status(400).json({
            message: "All 3 fields are required."
        })
    } else {
        try {
            const newUser = await db('users').insert(creds);
            const token = generateToken(newUser);
            res.status(201).json({ id: newUser.id, token });
        }
        catch ( err ) {
            res.status(500).json( err.message );
        }
    }
});




//Listen
const port = 8000;
server.listen( port, console.log(`===Server is running on port ${port}===`));
