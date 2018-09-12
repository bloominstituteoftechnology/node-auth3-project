const express = require('express');
const knex = require('knex');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const db = './db/dev.sqlite3'
const server = express();

server.use(cors());
server.use(express())

function protect(req, res, next){
    console.log('protect')
    next();
}

server.get('/', (req, res) => {
    res.status(200).send('Auth-ii -- Server is running.')
})

server.post('/api/register/', (req, res) => {
    const newUser = req.body; ///because you can't use dot notation in a then statemnet WebGLUniformLocation.
    console.log(req.body)
    const hash = bcrypt.hashSync(newUser.password, 3);
    newUser.password = hash;
    console.log(hash)
    //get userpassword 
    //run it through bcrypt
    //save as hash 
    //reassign to the req.password
    db('users')
        .insert(newUser)
        .then(count => {
            res.status(200).json({count: {count}, submitted: {user}})
        }).catch(err => {
            res.status(500).send(err)
        })
    
})

server.post('/api/login', (req, res) => {
    //check with bcrypt if req matches the password 

    res.status(200).send('Auth-ii -- login.')
})

server.get('/api/users', protect,  (req, res) => {
    res.status(200).send('Auth-ii -- users.')
})

server.listen(4400, () => console.log("\n == Server running on port 4400 == \n"))