const express = require('express');
const knex = require('knex');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const db = require('./db/dbConfig')

const server = express();

server.use(cors());

server.use(express.json());// this needs to be .json()

function protect(req, res, next){
    console.log('protect')
    next();
}

const secret = "1234"

function generateToken(user){
    const payload = {
        username: user.username,
        password: user.password,
        department: user.department
    }
    const options = {
        expiresIn: '1h', 
        jwtid: '12345'
    }
    return jwt.sign(payload, secret, options);
}

server.get('/', (req, res) => {
    console.log(req.body)
    res.status(200).send('Auth-ii -- Server is running.')
})

server.post('/api/register', (req, res) => {
    const newUser = req.body; ///because you can't use dot notation in a then statemnet WebGLUniformLocation.
    console.log(newUser);
    const hash = bcrypt.hashSync(newUser.password, 3);
    newUser.password = hash;
    
    db('users')
        .insert(newUser)
        .then(ids => {
            const id = ids[0]
            
            db('users')
                .where({id})
                .first()
                .then(user => {
                   const token = generateToken(user)
                   res.status(201).json({id: user.id, token})
                })

        }).catch(err => {
            res.status(500).send(err)
        })
    
})

server.post('/api/login', protect,  (req, res) => {
    //check with bcrypt if req matches the password 

    res.status(200).send('Auth-ii -- login.')
})

server.get('/api/users', protect,  (req, res) => {
    res.status(200).send('Auth-ii -- users.')
})

server.listen(4400, () => console.log("\n == Server running on port 4400 == \n"))