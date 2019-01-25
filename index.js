const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('knex');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const db_config = require('./knexfile');
const db = knex(db_config.development);

const server = express();
const PORT = 3300;
const secret = 'randomNumberGeneratorYesNoMaybe';

server.use(express.json());
server.use(cors());

function generateToken(user) { 
    const payload = {
        username: user.username,
        department: user.department
    };

    const options = {
        expiresIn: '1h',
        jwtid: '98765'
    };

    return jwt.sign(payload, secret, options);
}

function protected(req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, secret, (error, decodedToken) => {
            if (error) {
                res.status(401).json({message: 'Client sent an invalid token.'});
            }
            else {
                next();
            }
        });
    }
    else {
        res.status(401).json({message: 'You need to login to get access to this resource.'});
    }
}

server.post('/api/register', (req, res) => {
    const user = req.body;
    if (user.username && user.password && user.department) {
        const hash = bcrypt.hashSync(user.password, 14);
        user.password = hash;
        db('users').insert(user)
        .then((ids) => {
            const id = ids[0];
            db('users').where({id}).first()
            .then((user) => {
                if(user) {
                    const token = generateToken(user); 
                    res.status(201).json({id: user.id, token});
                }
                else {

                }
            })
            .catch((error) => {
                res.status(500).send(`Server sent an error of: ${error}`);
            })
        })
        .catch((error) => {
            res.status(500).send(`Server sent an error of: ${error}`);
        })
    }
    else {
        res.status(400).json({message: 'Registering a user requires a username, password and department.'});
    }
})

server.post('/api/login', (req, res) => {
    const userFromBody = req.body;
    if (userFromBody.username && userFromBody.password) {
        db('users').where('username', userFromBody.username)
        .then((user) => {
            if (user.length && bcrypt.compareSync(userFromBody.password, user[0].password)) {
                    const token = generateToken(user[0]);
                    res.status(200).json({message: `User ${user[0].username} logged in...`, token: token});
                }
            else {
                res.status(403).json({message: 'Username or password not recognized.'});
            }
        })
        .catch((error) => {
            res.status(500).json({error: `Server sent an error of: ${error}`});
        })
    }
    else {
        res.status(400).json({message: 'Logging in requires both a username and password'});
    }
});

server.get('/api/users', protected,  (req, res) => {
    db('users').select('id', 'username', 'department')
    .then((usernames) => {
        res.status(200).json(usernames);
    })
    .catch((error) => {
        res.status(500).json({message: `Server sent an error of: ${error}`});
    })
})

server.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
})