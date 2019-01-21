const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const server = express();
const db = knex(knexConfig.development);

server.use(express.json());
server.use(cors());



server.post('/api/register', (req, res)=>{
    const user = req.body;
    if(user.username && user.password && user.department){
        user.password = bcrypt.hashSync(user.password);
        db('users')
        .insert(user)
        .then(ids=>{
            res.status(201).json({id: ids[0]});
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
                res.json({info: `Welcome ${user.username}`});
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

server.get('/api/users', (req, res)=>{
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