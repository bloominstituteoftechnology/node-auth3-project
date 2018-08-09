const express = require('express');
const db = require('./data/db');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const server = express();

server.use(express.json());
server.use(cors({origin: 'http://localhost:3000'}));


server.post('/api/register', (req, res) => {
    const credentials = req.body;
    const hash = bcrypt.hashSync(credentials.password, 14);
    credentials.password = hash;

    db.insert(credentials)
        .into('users')
        .then(ids => {
            db('users')
                .where({ id: ids[0] })
                .first()
                .then(user => {
                    const token = generateToken(user);
                    res.status(201).json(token);
                })

        })
        .catch(err => {
            res.status(500).json(err);
        })
});

const secret = 'nobody tosses a dswarf';

function generateToken(user){
    const payload ={
        username: user.username,
    };

    const options = {
        expiresIn: '1h',
    };
    return jwt.sign(payload, secret, options);
}

function protected(req,res, next) {
    console.log(req.headers);
    const token = req.headers.authorization;
    console.log(token);
    if(token){
        jwt.verify(token, secret, (err, decodedToken) => {
            if(err) {
                return res.status(401).json({error: 'you shall not pass! - token invalid'});
            }
            req.jwtToken = decodedToken;
            next();
        })
    } else{
        return res.status(401).json({error: 'you shall not pass! - no token'});
    }
}

server.post('/api/login', (req, res) => {
    const credentials = req.body;


    db('users')
        .where({ username: credentials.username }).first()
        .then(user => {
            if (!user || !bcrypt.compareSync(credentials.password, user.password)) {
                return res.status(401).json({ error: 'You shall not pass!' });
            }
            else {
                const token = generateToken(user);
                res.status(201).json({ message: 'Logged in' });
            }
        })
    .catch(err => {
        res.status(500).json(err);
    })

})

server.get('/api/users', protected, (req,res) => {
    db('users')
        .select('id', 'username')
        .then(users => {
            res.status(201).json(users);
        })
        .catch(err => {
            res.status(500).json(err);
        })
})

const port = 3300;
server.listen(port, function () {
    console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});