const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const db = require('./db/dbConfig');

const server = express();


server.use(helmet());
server.use(express.json());
server.use(cors({ origin: "http://localhost:3000" }));

const secret = 'secret';

// ########## Generating token ###########
function generateToken(user){
    const payload = {
        username: user.username,
        department: user.department
    };

    const options = {
        expiresIn: '1h',
        jwtid: '12345'
    }
    return jwt.sign(payload, secret, options);
}

// ####### Protected middleware ##########
function protected(req, res, next) {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, secret, (error, decodedToken) => {
            if (error) {
                return res
                    .status(400)
                    .json({ Message: ' Invalid token' })
            } else {
                req.user = { username: decodedToken.username, department: decodedToken.department }
            next()
            }
        })
    } else {
        return res.status(400).json({ Message: 'No token found' })
    }
}

// ######### Server running ###########
server.get('/', (req, res) => {
    res.send('API running....')
});

// ########## Getting the users ############
server.get('/users', protected, (req, res) => {
    db('users')
        .select('id', 'username', 'department')
        .where({department: req.user.department})
        .then(users => {
            res.status(200).json(users)
        })
        .catch(error => {
            res.status(500).json({Message: 'Can not get users!', error})
        })
})

// ###### Registering newUser ############
server.post('/register', (req, res) => {
    const newUser = req.body;
    const hash = bcrypt.hashSync(newUser.password, 14);
    newUser.password = hash;

    db('users')
    .insert(newUser)
    .then(ids => {
      db('users')
        .where({ id: ids[0] })
        .first()
        .then(newUser => {
          const token = generateToken(newUser);
          res.status(201).json(token);
        });
    })
    .catch(function(error) {
      res.status(500).json({ error });
    });
})

// ########### Login ##############
server.post('/login', (req, res) => {
    const creds = req.body;

    db('users')
        .where({username: creds.username})
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(creds.password, user.password)) {
                const token = generateToken(user);
                res.status(200).json(token)
            } 
            else {
                return res.status(400).json({Message: 'Wrong credentials'})
            }
        })
        .catch(error => {
            res.status(500).json(error)
        })
})



server.listen(4000);