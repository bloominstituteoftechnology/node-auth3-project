const express = require('express');
const bcrypt = require('bcryptjs');
// const session = require('express-session');
const jwt = require('jsonwebtoken');
const knex = require('knex');
const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);


const server = express();


//jwt token secret
const secret = "nobody tosses a dwarf!";

//jwt token options
const options = {
    expiresIn: '1h',
    jwtid: "12345"
}

function protected(req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                res.status(401).json({
                    error: 'token error'
                })
            }
            console.log('decodedToken', decodedToken)
            req.jwtToken = decodedToken;
            next();
        })
    } else {
        return res.status(401).json({
            error: 'access denied.'
        })
    }
}

function generateToken(user) {
    const payload = {
        username: user.username,

    }
    return jwt.sign(payload, secret, options)
}


server.use(express.json());


server.post('/api/register', (req, res, next) => {
    const user = req.body;
    //hash pw
    const hash = bcrypt.hashSync(user.password, 14);
    user.password = hash;

    //post to db
    db('users')
        .insert(user)
        .then(response => {
            //generate token
            const token = generateToken(user);

            res.status(200).json({
                token
            })
        })
        .catch(err => {
            res.status(500).json({
                err
            });
        })
})



server.post('/api/login', (req, res, next) => {
    //get credentials from req
    const credentials = req.body;
    //query db
    db('users')
        .where({
            username: credentials.username
        })
        .first()
        .then(function (user) {
            if (user && bcrypt.compareSync(credentials.password, user.password)) {

                const token = generateToken(user);
                // res.setHeader("authorization", token);
                // res.status(200).send(`Welcome back, ${user.username}. Here is your token: ${token}`)
                res.send(token);
            }
        })
        .catch(err => {
            res.status(500).json({
                err,
            });
        })

}) 


//this route sends back just the list of usernames.
server.get('/api/users', protected, (req, res, next) => {
    const currentUser = req.jwtToken.username

    db('users')
        .then(response => {
            let userArray = [];
            response.map(users => {
                userArray.push(users.username)
            })
            res.status(200).json({
                currentUser,
                users: userArray
            })
        })
})

//restricted route sends back all user information to 'admin'
server.get('/api/restricted/edit_users', protected, (req, res, next) => {
        db('users')
            .then(response => {
                res.status(200).json({
                    response
                })
            })
     
})



const port = 8000;
server.listen(port, () => {
    console.log(`server running on port ${port}`)
});