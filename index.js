const express = require('express');
const server = express();
const bcrypt = require('bcryptjs');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const keys = require('./config/keys')
const knexConfig = require('./knexfile');
const knex = require('knex');
const db = knex(knexConfig.development)
const cookieCrisps = require('cookie-parser');

server.listen(8888, ()=> console.log(`Server listening on Port 8888`))

server.use(cors());
server.use(cookieCrisps())
server.use(express.json())
//SECRET
const jwtSecret = keys.secret;

//TOKEN GENERATOR
const generateToken = (user) =>{
const payload = {
        username: user.username,
        department: user.department
    }
const options = {
    expiresIn: '20m'
}

return jwt.sign(payload, jwtSecret, options)
}

//MIDDLEWARE
function protected(req, res, next){
    let token = req.headers.authorization;
    console.log(token)
    
    if(token){
        jwt.verify(token, jwtSecret, (err, decodedToken) =>{
            if(err){
                /* console.log('error', err) */
            res.status(500).json({message: 'Authentication error.'})
        }
            else{
                console.log('decodedtoken:',decodedToken)
                req.decodedToken = decodedToken

                next()
            }
        })
    
    }
    else{
        res.status(403).json({message: 'You are not authorized.'})
    }
}

//REGISTER
server.post('/api/register', (req, res) =>{
    let user = req.body;
    if(user.password && user.username){
        let hash = bcrypt.hashSync(user.password, 12)
        user.password = hash;
        req.cookies.jwt = generateToken(user)
        db('users').insert(user)
        .then(user => {res.status(201).json({user})})
        .catch(err => res.status(500).json({message: 'Error occurred while retrieving data.'}))
    }
    else{
        res.status(401).json({message: "Please enter both a username and password."})
    }
    
})
//LOGIN
server.post('/api/login', async (req, res) =>{
    let {password, username} = req.body;
    
    try{

        let user = await db('users').where({username}).first();
        
        if(user && bcrypt.compareSync(password, user.password) ){
            let token = generateToken(user)
            res.cookie('jwt', token)
            res.status(200).json({message: `Welcome, ${user.username}!`, token})
        }
        else{
            res.status(401).json({ message: 'Authentication failed.' });
        }
        
    }
    catch(err){
        res.status(500).json({err})
    }
});
//USERS 
 server.get('/api/users', protected, (req, res)=>{

        db('users')
        .then(users => res.status(200).json(users))
        .catch(err => res.status(500).json({message: 'Error occurred.'}))
});

//LOGOUT
server.post('/api/logout', logout, (req, res) =>{
    
    res.status(200).json({message: 'See you next time!'})
})

//LOGOUT MIDDLEWARE
function logout(req, res, next){
   
    req.cookies.jwt = 'loggedout';
    
    next()
}