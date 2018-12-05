const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const helmet = require('helmet');
const knex = require('knex');
const cors = require('cors');

const knexConfig = require('./knexfile');

const db = knex(knexConfig.development);

const server = express()

server.use(express.json())


function protected(req, res, next){
    const token = req.headers.authorization;

    if(token){
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) {
                // token verification valid
                res.status(401).json({message: 'invalid token'})
            }else{ 
                req.decodedToken = decodedToken;
                next();

             }
        })
    }else{
        res.status(401).json({message: 'no token provided'})
    }
}

function checkRole(role){
    return function (req, res, next) {
        if (req.decodedToken && req.decodedToken.roles.includes(role)) {
            next()
        } else {
            res.status(403).json({ message: "You Shall Not Pass! *Boom* FORBIDDEN!" })
        }
    }
}

server.use(helmet());
server.use(cors());

server.get('/', (req, res) => {
    res.json({ message: 'API Running!' });
});

server.post('/api/register', (req, res) => {
    const credentials = req.body;
    const hash = bcrypt.hashSync(credentials.password, 14);
    credentials.password = hash;
    db('users').insert(credentials)
    .then(user => {res.status(201).json(user)})
    .catch(error => res.status(500).json({ message: "You done F'd Up", error }))
});

const jwtSecret = 'nobody tosses a dwarf!';

function generateToken(user){
    const jwtPayload = {
        ...user,
        hello: 'Homie',
        roles: ['admin', 'root'],

    }


    const jwtOptions = {
        expiresIn: '1m',
    }

    return jwt.sign(jwtPayload, jwtSecret, jwtOptions)
}


server.post('/api/login', (req, res) => {
    const logger = req.body

    db('users')
    .where({ username: logger.username })
    .first()
    .then(user => {
        if (user && bcrypt.compareSync(logger.password, user.password)){
            const token = generateToken(user);

            res.status(200).json({ message: `Logged In: Welcome ${user.username}!`, token })
        } else {res.status(401).json({ message: 'You Shall Not Pass!' })}
    }).catch(error => res.status(500).json({ message: 'error', error }));
    
    // db('users').insert(logger)
    // .then(user => res.status(201).json(user))
    // .catch(error => res.status(500).json({ message: "You done F'd Up", error }))
});

server.get('/api/users', protected, checkRole('admin'), (req, res) => {
    console.log('\n O_O **Decoded Token Information** O_O \n', req.decodedToken);
    db('users')
        .select('username', 'id', 'password')
        .then(user => res.status(200).json(user))
        .catch(error => res.status(500).json({ message: 'Could Not Retrieve Users', error }));


})




server.listen(7777, () => console.log('\n === API Running On Port 7777 => http://localhost:7777 ===\n'))