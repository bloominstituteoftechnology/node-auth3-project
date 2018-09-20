const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const knex = require ('knex');

// const dbConfig = require('./dbConfig.js')

const db = require('./dbConfig.js')

const server = express();

server.use(express.json());
server.use(cors());

const secret = 'apples and bananas';

function generateToken(user) {
    const payload = {
        username: user.username
       
    };
    const options = {
        expiresIn: '1h',
        jwtid: '12345',
    };
    return jwt.sign(payload,secret,options)
}

function protected(req, res, next) {
    const token = req.headers.authorization;
    if(token) {
 
    jwt.verify(token, secret, (err, decoded) => {
                if (err) {
                console.log('jwt.verify',err)
                res.status(401).send('invalid token')
                }
                else {
                 next()  
                }
          
        })
    }
   
        
    
}

// endpoints

server.get('/', (req,res) => {
    res.send('hahahahahahahahahahahaha!')
});

server.post('/api/register', (req,res) => {
    const creds = req.body;
    const hash = bcrypt.hashSync(creds.password,10);
    creds.password = hash;
    db('users')
    .insert(creds)
    .then(ids => {
     const id = ids[0];

     db('users')
     .where({ id })
     .first()
     .then(user => {
         console.log('user',user);
         const token = generateToken(user);
         console.log('token', token);
         res.status(201).json({id: user.id, token});
     })
     .catch(err => {
        console.log('/api/register POST ERROR:', err);
        res.status(500).send(err);
     });
   })
   .catch(err => {
    console.log('/api/register POST ERROR:', err);
    res.status(500).send(err);
 })
});

server.post('/api/login', (req,res) => {
    const creds = req.body;

    db('users')
    .where({ username:creds.username})
    .first()
    .then(user => {
     if(user && bcrypt.compareSync(creds.password, user.password)) {
         const token = generateToken(user);

         res.status(200).json({ token });
     } else {
         res.status(401).json({ message: 'NOPE!'});
     }
    })
    .catch(err => {
        console.log('/api/login POST ERROR:', err);
        res.status(500).send(err);
     })
});

server.get('/api/users', protected, (req, res) => {
    db('users')
    .select('id','username','password')
    .then(users => {
        res.json(users);
    })
    .catch(err => {
        console.log('/api/users GET ERROR:', err);
        res.status(500).send(err);
     })
});

server.listen(1234, () => console.log('\nRUNNING ON 1234\n'));

