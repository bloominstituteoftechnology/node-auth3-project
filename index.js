const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const db = require('./db/dbConfig');

const server = express();


server.use(helmet());
server.use(express.json());
server.use(cors());


// ####### Protected middleware ##########
function protected (req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if (error) {
                return res.status(400).json({Message: 'Invalid token'});
            }
            req.jwtToken - decodedToken;
            next();
        });
    }
    else {
        return res.status(500).json({Message: 'No token found!'});
    }
}

// ########## Generating token ###########
function generateToken(user){
    const payload = {
        username: user.username
    }

    const secret = 'secret';
    const options = {
        expiresIn: '1h',
        jwtid: '12345'
    }
    return jwt.sign(payload, secret, options);
}

// ######### Server running ###########
server.get('/', (req, res) => {
    res.send('API running....')
});

// ########## Getting the users ############
server.get('/users', protected, (req, res) => {
    db('users')
        .then(users => {
            res.status(200).json(users)
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

// ###### Registering newUser ############
server.post('/register', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, 14);

    let { username, password } = req.body;
    let user = { username, password };

    db('users')
        .insert(user)
        .then(ids => {
            db('users')
            .where({ id: ids[0] })
            .first()
            .then(user => {
                const token = generateToken(user);
                res.status(201).json(token);
            })
            .catch(error => {
                res.status(500).json(error);
            })
        })
})


server.listen(4000);