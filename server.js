const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const sessions = require('express-session');
const jwt = require('jsonwebtoken');

const dbConfig = require('./knexfile');

const db = knex(dbConfig.development);

const server = express();

server.use(helmet());
server.use(express.json()); // don't forget this
server.use(cors());

const secret = 'buy more cheese';

function generateToken(user) {
    const payload = {
        username: user.username,
        department: user.department
    };
    const options = {
        expiresIn: '1h',
        jwtid: '12345',
    };
    return jwt.sign(payload,secret,options);
}

server.post('/api/register', (req,res) => {
    const creds = req.body;
    const hash = bcrypt.hashSync(creds.password, 10);
    creds.password = hash;
    db('users')
    .insert(creds)
    .then(ids => {
        const id = ids[0];

        db('users')
        .where({id})
        .first()
        .then(user => {
            const token = generateToken(user);
            res.status(201).json({ id: user.id, token});
        })
        .catch(err => res.status(500).send(err));
    })
    .catch(err => res.status(500).send(err));
});

server.post('/api/login', (req,res) => {
    const creds = req.body;

    db('users')
    .where({username: creds.username})
    .first()
    .then(user => {
        if(user && bcrypt.compareSync(creds.password,user.password)){
            const token = generateToken(user);

            res.status(200).json({ token });
        }else{
            res.status(401).json({ message: 'You shall not pass!' });
        }
    })
    .catch(err => res.status(500).send(err));
});


function protected(req,res,next) {
    const token = req.headers.authorization;

    if(token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message: 'Invalid Token' });
            }else{
                req.user = { 
                    username: decodedToken.username, 
                    department: decodedToken.department };

                next();
            }
        });
    } else {
        res.status(401).json({message: 'no token provided'});
    }
}

//protect the route using the 'protected' function
//get request for users -- show only to those logged in

server.get('/api/users', protected, (req,res) => {
    if (req.user.department === 'admin'){
        console.log(req.user)
        db('users')
        .select('id', 'username', 'password', 'department')
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send(err));
    } else {
        res.status(403).json( {message: 'You must be a member of the administrative team to access these resources'} )
    }
})


//start server
server.get('/', (req, res) => {
res.send('API Running...');
});



server.listen(9000);