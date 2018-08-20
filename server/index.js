const express = require('express');
const app = express();
const db = require('./data/db');
const logger = require('morgan')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cors = require('cors')


app.use(cors())
app.use(express.json());
app.use(logger('dev'));

app.get('/', (req, res) => {
    res.send('Welcome to Lambda School Authentication II Project');
});

// ALL ABOUT TOKEN
const secret = 'this must stay hidden'

// Token Generator
function generateToken(user){
    const payload = {
        username : user.username
    }

    options = {
        expiresIn : "1 days"
    }

    return jwt.sign(payload, secret, options)
}



function protected( req, res, next){
    const token = req.headers.authorization
    if(token){
        jwt.verify(token ,secret , (err, decodetoken) => {
            if(err){
                return res.status(401).json({ error : 'unauthorized login : invalid token' })
            }
            req.jwtToken = decodetoken
            next()
        })
    }
    else{
        return res.status(401).json({ error : 'unauthorized login : no token' })
    }
}    

app.post('/api/register', (req, res) => {
    const { username, password , department } = req.body;
    const user = { username, password, department }
    //Hasshing My Passowrd
    const hash = bcrypt.hashSync(user.password, 14 )
    user.password = hash 
    //Database Query 
    db.addUser(user)
        .then( response => {
            if(response){
                db.getUsers(response[0]).first()
                    .then( response => {
                        const token = generateToken(response)
                        res.status(200).json(token)
                    })
                    .catch( err => res.status(500).json({err : err}))
            }
            else{
               res.json(404).send('user not created')
            }
        })
        .catch( err =>  res.status(500).json({ error : err }))
});

app.post('/api/login', (req, res) => {
    const credentials = req.body;
    db.getUser(credentials.username).first()
        .then( response => {
            if(response && bcrypt.compareSync(credentials.password,response.password)){
                const token = generateToken(response)
                res.status(200).json({token})
            }
            else{
                res.status(401).send('invalid credentials')
            }
        })
        .catch( err => {
            res.status(500).send('invalid credentials')
        })
});

app.get('/api/users', protected,  (req, res) => {
    console.log('token', req.jwtToken)
    db.getUsers()
        .then( response => {
            console.log(response)
            res.status(200).json(response)
        })
        .catch( err =>{
            res.status(500).json({error : err })
        })
});

app.listen(5000, () => {
    console.log('Example app listening on port 5000!');
});

//Run app, then load http://localhost:5000 in a browser to see the output.