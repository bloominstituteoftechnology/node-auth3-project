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
const secret = 'secret';

function generateToken(username){
    const payload = {
        username
    };
    
    const options = {
        expiresIn: '1h',
        jwtid: '123'
    }
    return jwt.sign(payload, secret, options)
}
function protector(req, res, next){
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token, secret, (err, decodedToken) =>{
            if(err){
                res.status(401).json({message: 'Invalid token'})
            }else{
                req.username = decodedToken.username;
                next();
            }
        })
    }else{
        res.status(401).json({message: 'No token provided'})
    }    
}

server.post('/api/register', (req, res) =>{
    const creds = req.body;
    creds.password = bcrypt.hashSync(creds.password);
    db('user').insert(creds)
        .then(ids =>{
            
            res.status(201).json(ids);
        })
        .catch(() =>{
            res.status(500).json({message: 'Sorry, failed to register new user'})
        })
})

server.post('/api/login', (req, res) =>{
    const creds = req.body;
    db('user').where({username: creds.username})
        .first()
        .then(user =>{
            if(user && bcrypt.compareSync(creds.password, user.password)){
                const token = generateToken(user);
                res.json({message: 'Correct combination of username and password', token})
            }else{
                res.status(404).json({message: 'Invalid username and/or password'})
            }
        })
        .catch(() =>{
            res.status(500).json({message: 'Failed to successfuly login'})
        })
})

server.get('/api/users', protector, (req, res) =>{
    db('user')
        .select('id', 'username','department')
        .then(users =>{
            res.json(users);
        })
        .catch(() =>{
            res.status(500).json({message: 'You shall not pass!'})
        })
})


server.listen(4000, () =>{
    console.log('Server is up and running my dude');
})