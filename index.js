const express = require('express');
const server = express();
const cors = require('cors');
const knex = require('knex');
const dbConfig = require('./knexfile');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const db = knex(dbConfig.development)
const PORT = process.env.PORT || 6789;

function protect(req, res, next) {
    const token = req.headers.authorization;

    jwt.verify(token, secret, (err, decodedToken) => {
        if (err) {
            res
            .status(401)
            .json({ message: 'Invalid Token'})
        } else {
            next();
        }
    });
}

function generateToken(){
    const payload = {
        username: user.username,
    };

    const options = {
        expiresIn: '1h'
    };

    return jwt.sign(payload, secret, options);
}

server.use(express.json());
server.use(cors());

//POST /api/register

server.post('/api/register', (req, res) =>{
    const user = req.body;
    if(user.username && user.password){
        user.password = bcrypt.hashSync(user.password);
        db('users').insert(user)
        .then( ids => {
            db('users').where('id',ids[0]).first()
            .then(user => {
                const token = generateToken(user)
                res
                .status(201)
                .json({id: user.id, token})
            });
        })
        .catch(err =>{
            res
            .status(500)
            .send(err);
        })
    } else {
        res
        .status(400)
        .json({errorMessage: "Please provide a username and password"})
    }
})

//POST /api/login

server.post('/api/login', (req, res) => {
    const checkUser = req.body;
    if(checkUser.username && checkUser.password){
        db('users').where('username', checkUser.username)
        .then(users => {
            if(users.length && bcrypt.compareSync(checkUser.password, users[0].password)){
                const token = generateToken(user)
                res.json({info: "Logged In", id: user.id, token})
            } else {
                res
                .status(404)
                .json({error: 'You shall not pass!'})
            }
        })
        .catch(err => {
            res
            .status(500)
            .send(err)
        })
    } else {
        res
        .status(400)
        .json({errorMessage: "Please provide your username and password"})
    }

});


//GET /api/users

server.get('/api/users', protect, (req, res) =>{
    db('users')
    .select('id', 'username')
    .then(users =>{
        res
        .json(users);
    })
    .catch(err => res.status(500).send(err));
});

server.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
})