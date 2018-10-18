const express = require('express');
const users = require('../models/dataModel.js');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const middleware = require('../config/routerMiddleware.js');

router.get('/', (req, res)=>{
    res.status(200).json("It's alive!");
});

router.post('/register', (req, res)=>{
    const hash = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hash;
    const {username, password, department} = req.body;
    const user = {username, password, department};
    users.register(user)
        .then(ids=>{
            res.status(200).json(ids[0]);
        })
        .catch(err => res.status(500).json(err.message));
});

const jwtSecret = 'Got treasures in my mind,';

router.post('/login', (req, res)=>{
    const {username, password} = req.body;
    const credentials = {username, password};
    users.login(credentials.username)
        .then(user =>{
            if(user){
                if(bcrypt.compareSync(credentials.password, user.password)){
                    const token = generateToken(user);
                    res.status(200).json({welcome:user.username, 
                        department:user.department,
                        token
                    });
                }else{
                    res.status(401).json({message:`username and password do not match`});
                }
            }else{
                res.status(401).json({message:`username and password do not match`});
            }
        })
        .catch(err => res.status(500).json(err.message));
});

router.get('/users', protected, (req, res)=>{
    users.getUsers()
        .then(something=>{
            res.status(200).json(something);
        })
        .catch(err => res.status(500).json(err.message));
});

function protected(req, res, next, jwtSecret){
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if(err){
                res.status(401).json({message: 'invalid token'});
            }else{
                req.decodedToken = decodedToken;
                next();
            }
        });
    }else{
        res.status(401).json({message: 'no token provided'});
    }
};

function generateToken(user){
    const jwtPayload = {
        username: user.username,
        department: user.department,
        roles: ['admin']
    };
    const jwtOptions = {
        expiresIn: '1m'
    };
    return jwt.sign(jwtPayload, jwtSecret, jwtOptions);
}

module.exports = router;