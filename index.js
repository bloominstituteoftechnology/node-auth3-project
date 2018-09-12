const express = require('express');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const server = express();
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
        expiresIn: '1h',
        jwtid: '12345',
        subject: `${user.id}`
    }
    return jwt.sign(payload, secret, options);
};

protected = (req, res, next) => {
    const token = req.headers.authorization;
    if ( token ) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message: 'Invalid token.' })
            } else {
                req.user = { 
                    username: decodedToken.username,
                    department: decodedToken.department
                }
                next();
            }
        });
    } else {
        return res.status(401).json({
            message: 'You shall not pass!'
        })
    }
};

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
            const ids = await db('users').insert(creds);
            const id = ids[0];
            const user = await db('users').where({ id }).first();
            const token = generateToken(user);
            res.status(201).json({ id: user.id, token });
        }
        catch ( err ) {
            res.status(500).json( err.message );
        }
    }
});

server.post('/api/login', ( req, res ) => {
    const creds = req.body;
    db('users')
        .where({ username: creds.username})
        .first()
        .then ( user => {
            if ( user && bcrypt.compareSync( creds.password, user.password )) {
                const token = generateToken(user);
                res.status(200).json({ token });
            } else {
                res.status(401).json({
                    message: 'You shall not pass!'
                });
            }
        })
        .catch(err => { res.status(500).json( err.message ) });
});

server.get('/api/users', protected, ( req, res ) => {
   db('users')
    .select('id', 'username', 'department')
    .then( users => { res.json( users ) })
    .catch ( err => { res.status(500).send(err.message) })
});


//Listen
const port = 8000;
server.listen( port, console.log(`===Server is running on port ${port}===`));
