const secret = "1234"

const express = require('express');
const knex = require('knex');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const db = require('./db/dbConfig')

const server = express();

server.use(cors({ credentials: true, 
    origin: 'http://localhost:3000'}));

server.use(express.json());// this needs to be .json()

function protect(req, res, next){//this makes sure that there is a valid token that provides identity and passes that info
    console.log('protect', req.headers)
    const token = req.headers.authorization
    if (token){
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                res.status(200).json({message: "error in middleware", err: err})
            } else {
                req.user = {//this is when verification is needed but not a post request. so access
                    username: decodedToken.username,
                    // password: decodedToken.password,
                    department: decodedToken.department
                }
                next();
            }
        })
    } else {
        res.status(401).json({message: 'no token! you need a token!'})
    }
}

function generateToken(user){
    const payload = {
        username: user.username,
        // password: user.password,
        department: user.department
    }
    const options = {
        expiresIn: '1h', 
        jwtid: '12345'
    }
    return jwt.sign(payload, secret, options);
}

server.get('/', (req, res) => {
    console.log(req.body)
    res.status(200).send('Auth-ii -- Server is running.')
})

server.post('/api/register', (req, res) => {
    const newUser = req.body; ///because you can't use dot notation in a then statemnet WebGLUniformLocation.
    console.log(newUser);
    const hash = bcrypt.hashSync(newUser.password, 3);
    newUser.password = hash;
    
    db('users')
        .insert(newUser)
        .then(ids => {
            const id = ids[0]
            db('users')
                .where({id})
                .first()
                .then(user => {
                   const token = generateToken(user)
                   res.status(201).json({id: user.id, token})
                }).catch(err => console.log(err))

        }).catch(err => {
            res.status(500).send(err)
        })
    
})

server.post('/api/login',  (req, res) => {
    //check with bcrypt if req matches the password 
    const request = req.body
    db('users')
        .where({username: request.username})
        .first()//returns an item instead of an Array
        .then(dbUser => {
            if (dbUser && bcrypt.compareSync(request.password, dbUser.password)){
               const token = generateToken(dbUser)
                res.status(200).json({message: 'you are now logged in', token})
            } else {
                res.status(401).send('no passing for you!')
            }
        })
})

server.get('/api/users', protect,  (req, res) => {//protected because we need to check if logged in
    const roles = ['admin', 'Executive', null]
    //null because I don't have an input field yet 
    // if their role is not on this list they get bounced
    
    if(roles.includes(req.user.department)){
        db('users')
        .then(users => {
            res.status(200).json({users})
        })
    } else {
        res.status(400).json({message: 'you do not have the necessary permissions to access this data.'})
    }
   
})

server.listen(4400, () => console.log("\n == Server running on port 4400 == \n"))