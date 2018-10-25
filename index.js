const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);
const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

const jwtSecret = 'i@m$av%ega!n';

function generateToken(user){
    const jwtPayload = {
        ...user,
        hello: 'FSW13',
        role: 'admin'
    };
    const jwtOptions = {
        expiresIn: '5m'
    };
    return jwt.sign(jwtPayload, jwtSecret, jwtOptions);
}

server.post('/api/register', (req, res) => {
    const credentials = req.body;
    const hash = bcrypt.hashSync(credentials.password, 14);
    credentials.password = hash;

    db('users').insert(credentials)
    .then(ids => {
        const id = ids[0];
        res.status(201).json({newUser:id})
    })
    .catch(err => {
        res.status(500).send(err.message)
    })
})

server.get('/api/users', protected, (req, res) => {
    db('users')
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).send(err.message)
    })
})


server.post('/api/login', (req, res) => {
    const creds = req.body;
    db('users')
    .select('*')
    .where({username:creds.username}).first()
    .then(user => {
        if(user && bcrypt.compareSync(creds.password, user.password)){
            const token = generateToken(user);
            res.status(201).send({message: "Welcome " + user.username, token})
        }else{
            res.status(401).send({message: "UserId or password incorrect"})
        }
    })
    .catch(err => {
        res.status(500).send(err.message)
    })
})


function protected(req, res, next) {
    const token = req.headers.authorization;
    console.log(req.headers)
    if(token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if(err) {
                //token verification failed
                res.status(401).json({message: 'invalid token'});
            }else{
                //token is valid
                req.decodedToken = decodedToken;
                next();
            }
        })
        
    }else{
        res.status(401).json({message: "No token provided"})
    }
        
}



const port = 7000;
server.listen(port, () => {
    console.log(`Server started on port ${port}!`)
})