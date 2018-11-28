require('dotenv').config()
const jwt = require('jsonwebtoken')
const express = require('express')
const bcrypt = require('bcryptjs')
const db = require('./data/db')
const protect = require('./protect.js')
const server = express();

server.use(express.json());

const port = 9000;

server.listen(port, function() {
    console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
    
});

server.post('/api/register', (req,res) => {
    let userCred = req.body;
    const hash = bcrypt.hashSync(userCred.password, 8);
    userCred.password = hash;
    db.register(userCred)
    .then(id => {
        res.status(201).json(id)
    })
    .catch(err => {
        res.status(500).json({message: err})
    })
})

function generateToken(user) {
    const payload = {
      subject: user.id,
      username: user.username,
      roles: user.department, // this will come from the database
    };
  
    const secret = process.env.SECRET;
    const options = {
      expiresIn: '1m',
    };
  
    return jwt.sign(payload, secret, options);
}

server.post('/api/login', (req, res) => {
    let userCred = req.body;
    db.login(userCred)
    .then(user => {
        if(user && bcrypt.compareSync(userCred.password, user.password)) {
            const token = generateToken(user);
            res.status(200).json({message: 'Login Success', token})
            
        } else {
            res.status(401).json({message: 'You shall not pass!'})
        }
    })
    .catch(err => {
        res.status(500).json({message: 'Hey'});
    })
})

server.get('/api/users', [protect], (req,res) => {
    const decoded = jwt.verify(req.headers.authorization, process.env.SECRET)
    db.getUsers(decoded.department)
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})