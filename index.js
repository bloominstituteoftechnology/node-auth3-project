// require statements for NPM packages
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// pull in database
const db = require('./database/dbConfig');

// create a server instance using express
const server = express();

// middleware
server.use(express.json());
server.use(cors());

// logged-in middleware
function protected(req, res, next) {
    // get authorization from request header
    const token = req.headers.authorization;

    if (token) {
        // verify the token
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                // token is invalid
                res.status(401).json({errorMessage: 'Invalid token.'});
            } else {
                // token is valid
                console.log(decodedToken);
                // set request user to do things like find roles
                req.user = { username: decodedToken.username };

                next();
            }
        });
    } else {
        res.status(401).json({errorMessage: 'No token provided. You shall not pass!'});
    }
}

// JSON web token secret
const secret = 'the cake is a lie';

// function to generate a JSON web token
function generateToken(user) {
    const payload = {
        username: user.username,
    };
    const options = {
        expiresIn: '1h',
        jwtid: '1234567890',
        subject: `${user.id}`,
    };
    return jwt.sign(payload, secret, options)
}

// endpoints

server.post('/api/register', (req, res) => {
    // pull in credentials from request
    const creds = req.body;
    // hash password from creds
    const hash = bcrypt.hashSync(creds.password, 12);
    // set creds to hash
    creds.password = hash;

    // insert the new credentials into the users database
    db('users')
        .insert(creds)
        .then(ids => {
            const id = ids[0];

            // query the database for the user that has the ID returned
            db('users')
                .where({id})
                .first()
                .then(user => {
                    // create new JWT
                    const token = generateToken(user);
                    // return ID and JWT
                    res.status(201).json({id: user.id, token})
                })
                .catch(err => {
                    res.status(500).json(err);
                })
        })
        .catch(err => {
            res.status(500).json(err);
        })
});

server.post('/api/login', (req, res) => {
    // pull in credentials from request
    const creds = req.body;

    // query users database for match with creds username
    db('users')
        .where({username: creds.username})
        .first()
        .then(user => {
            // if the user exists and the passwords from creds and database match
            if (user && bcrypt.compareSync(creds.password, user.password)) {
                // generate token
                const token = generateToken(user);
                // return token
                res.status(200).json({token});
            } else {
                res.status(401).json({errorMessage: 'You shall not pass!'});
            }
        })
        .catch(err => {
            res.status(500).send(err);
        })
});

server.get('/api/users', protected, (req, res) => {
    const currentUser = req.user;
    console.log('currentUser from index', currentUser)
    // select the information of all the users from the users database
    db('users')
        .where('username', currentUser.username)
        .first()
        .then(user => {
            console.log('user from index', user)
            db('users')
                .where('department', user.department)
                .select('id', 'username', 'department')
                .then(users => {
                    res.status(200).json(users);
                })
                .catch(err => {
                    res.status(500).send(err);
                })
            })
            .catch(err => {
                res.status(500).send(err);
            })
    });

server.listen(7001, () => console.log('\n-=- Server listening on port 7001 -=-\n'));