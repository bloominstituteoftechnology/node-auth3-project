// https://github.com/LambdaSchool/auth-ii/pull/172

const express = require('express');
const db = require('./dbConfig.js');
const jwt = require('jsonwebtoken');
const express_jwt = require('express-jwt');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const PORT = 8080;

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req,res)=>{
    res.send('YOYO');
})

const secret = 'somesecret';

function generateToken(user){
    let payload = {
        name: user.name
    };
    let options = {
        expiresIn: '2h',
        jwtid:'1212'
    };
    return jwt.sign(payload, secret, options);
}

app.post('/api/register', (req,res)=>{
    const creds = req.body;
    const hash = bcrypt.hashSync(creds.password, 10);
    creds.password = hash;
    db('users')
        .insert(creds)
        .then(ids => {
            const id = ids[0];
            db('users')
                .where({'id':id})
                .first()
                .then(user => {
                    const token = generateToken(user);
                    res.status(201).json({id: user.id, token})
                })
                .catch(err => {
                    console.log(`Error registering: ${err}`);
                    res.status(500).json({message: `Sorry`})
                })
        })
});

function protected(req, res, next){
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token, secret, (err, decodedPayload)=>{
            if(err){
                res.status(401).json({message: 'Invalid token'})
            } else {
                console.log(`Decoded token: ${decodedPayload}`);
                req.user = { name: decodedPayload.name };
                next();
            }
        })
    } else {
        res.status(401).json({message: 'Sorry, bub. No token was provided.'});
    }
}

app.post('/api/login', (req,res)=>{
    const creds = req.body;
    db('users')
        .where('name', creds.name)
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(user.password, user.hash)){
                const token = generateToken(user);
                res.status(201).json({message: `Successful login, here have a token: ${token}`});
            } else {
                res.status(401).json({message: `Invalid login info.`});
            }
        })
        .catch(err => {
            console.log(`Error: ${err}`);
            res.status(501).json({message: 'Sorry, '})
        });
});

app.get('api/users', protected, (req,res)=>{
    // I don't understand -->  "Use this endpoint to verify that the password is hashed before it is saved."
    db('users')
        .select('name', 'department')
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({message: `Sorry, unable to complete request for users`})
        })
})

app.listen(PORT, console.log(`Listening on port ${PORT}`)
);