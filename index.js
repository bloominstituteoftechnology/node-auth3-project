const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./database/dbConfig.js');

const server = express();

server.use(express.json());
server.use(cors({ origin: "http://localhost:3000" }));

const secret = 'cirmoscicahaj!';

function generateToken(user) {
    const payload = { username: user.username, 
        department: user.department };
    
     const options = {
        expiresIn: '72h',
    };
    return jwt.sign(payload, secret, options);
}

function protected(req, res, next) {
    
    let token = req.headers.authorization;
    if (token !=="null") {
        jwt.verify(token.replace('Bearer ', ''), secret, (err, decodedToken) => {
            if (err) {
                
                res.status(401).json({ token, message: 'Invalid Token', err, decodedToken });
            } else {
                console.log("\n** decoded token information **\n", decodedToken);
                req.user = { username: decodedToken.username, department: decodedToken.department };
                next();
            }
        });
    } else {
        res.status(401).json({ message: 'Please log in.' });
    }
}
function checkRole(role) {
    console.log(role);
    return function (req, res, next) {
        if (req.decodedToken && req.decodedToken.roles.includes(role)) {
            next();
        } else {
            res.status(403).json({ role, decode: req.decodedToken, message: 'you shall not pass! forbidden' });
        }
    };
}

// Endpoints 
server.get('/', (req, res) => {
    res.send('Server online, keep coding');
});

server.post('/api/register', (req, res) => {
    const creds = req.body;

    const hash = bcrypt.hashSync(creds.password, 11);
    
    creds.password = hash;
    db('users')
        .insert(creds)
        .then(ids => {
            const id = ids[0];
            res.status(201).json({ newUserId: id });
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

server.post('/api/login', (req, res) => {
    const creds = req.body;

    db('users')
        .where({ username: creds.username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(creds.password, user.password)) {
                const token = generateToken(user);
                res.status(200).json({ welcome: user.username, token });
            } else {
                res.status(401).json({ user, message: 'You shall not pass' });
            }
        })
        .catch(err => res.status(500).send(err));
});

server.get('/api/users', protected, (req, res) => {
   const creds = req.user;
    db('users')
    .select('id', 'username', 'department')
            .where({ department: creds.department })
    .then(users => {
     res.json(users);
        
    })
    .catch(err => res.send(err));
    
}); 

            
       


server.listen(5500, () => console.log('\nrunning on port 5500\n'));