// tim password Engineering
// john password HR

const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const server = express();
const db = knex(knexConfig.development);

server.use(express.json());
server.use(cors());

const secert = 'Thats Eighty Hundred';

function generateToken(username){
    const payload = {
        username
    };

    const options = {
        expiresIn: '2h',
        jwtid: '12345'
    }

    return jwt.sign(payload, secert, options)
}

function protected(req, res, next){
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token, secert, (error, decodedToken)=>{
            if(error){
                res.status(401).json({error: 'Invalid token'});
            }
            else{
                next();
            }
        })
    }
    else{
        res.status(401).json({errorMessage: 'No token found'})
    }
}

server.post('/api/register', (req, res)=>{
    const user = req.body;
    if(user.username && user.password && user.department){
        user.password = bcrypt.hashSync(user.password);
        db('users')
        .insert(user)
        .then(ids=>{
            // Query database if more user data is needed
            const token = generateToken(user.username);
            res.status(201).json({id: ids[0], token: token});
        })
        .catch(error=>{
            res.status(500).json({error: 'Failed to add users'});
        })
    }
    else{
        res.status(400).json({errorMessage: 'Please include a username, password and department'});
    }
})

server.post('/api/login', (req, res)=>{
    const user = req.body;
    if(user.username && user.password){
        db('users')
        .where('username', user.username)
        .then(users=>{
            if(users.length && bcrypt.compareSync(user.password, users[0].password)){
                const token = generateToken(user.username);
                res.json({info: `Welcome ${user.username}`, token: token});
            }
            else{
                res.status(404).json({errorMessage: 'Invalid username or password'});
            }
        })
        .catch(error=>{
            res.status(500).json({error: 'Failed to find user'});
        })
    }
    else{
        res.status(400).json({errorMessage: 'Please include a username or password'});
    }
})

// logout -> destroy token on client side

server.get('/api/users', protected, (req, res)=>{
    db('users')
    .select('id', 'username', 'department')
    .then(users=>{
        res.json(users);
    })
    .catch(error=>{
        res.status(500).json({error: 'Failed to return users'});
    })
})

server.listen(3300, ()=>console.log('Starting Server on PORT: 3300'));