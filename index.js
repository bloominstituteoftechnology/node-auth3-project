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
        jwt.verify(token, secret)
    }
}

app.listen(PORT, console.log(`Listening on port ${PORT}`)
);