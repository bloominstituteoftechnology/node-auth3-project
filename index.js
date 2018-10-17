const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./dbConfig.js')

const server = express();

server.use(express.json());
server.use(cors());

const secret = 'deez nuts';

// Token
function generateToken(user) {
    const payload = {
        username: user.username,
    };
    const options = {
        expiresIn: '1h',
        jwtid: '12345',
    };
    return jwt.sign(payload,secret,options)
}

// Middle ware...checking for token
function protected(req, res, next) {
    const token = req.headers.authorization;
    if(token) {
 
    jwt.verify(token, secret, (err, decoded) => {
     if (err) {
      res.status(401).send(`That ain't your token`)
      } else {
        next()  
      }
    })
  }  
}

server.get('/', (req,res) => {
    res.send('Yeah......')
});

//################################### POST ########################################//
server.post('/register', (req,res) => {
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
         const token = generateToken(user);
         res.status(201).json({id: user.id, token});
     })
     .catch(err => {
        res.status(500).send(err);
     });
   })
   .catch(err => {
    res.status(500).send(err);
 })
});

server.post('/login', (req,res) => {
    const creds = req.body;

    db('users')
    .where({ username:creds.username})
    .first()
    .then(user => {
     if(user && bcrypt.compareSync(creds.password, user.password)) {
         const token = generateToken(user);

         res.status(200).json({ token });
     } else {
         res.status(401).json({ message: 'Nahh my friend'});
     }
    })
    .catch(err => {
        res.status(500).send(err);
     })
});

//################################### GET ########################################//
server.get('/users', protected, (req, res) => {
    db('users')
    .select('id','username')
    .then(users => {
        res.json(users);
    })
    .catch(err => {
        res.status(500).send(err);
     })
});

server.listen(9001, () => console.log('\n ** This is port 9001 ** \n'));

