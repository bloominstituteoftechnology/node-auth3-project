const express = require ('express');
const db= require('./data/db');
const bcrypt= require('bcryptjs');
const cors= require('cors');
//const session= require('express-session');
const jwt= require('jsonwebtoken');
const server= express();

// server.use(
//     session({
//       name: 'notsession', // default is connect.sid
//       secret: 'nobody tosses a dwarf!',
//       cookie: { 
//           maxAge: 1 * 24 * 60 * 60 * 1000,
//           secure: true // only set cookies over https. Server will not send back a cookie over http.
//         }, // 1 day in milliseconds
//       httpOnly: true, // don't let JS code access cookies. Browser extensions run JS code on your browser!
//       resave: false,
//       saveUninitialized: false,
//     })
//   );

server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
    res.send('Auth-i');
});

server.get('/setname', (req, res) => {
    req.session.name = 'Frodo';
    res.send('got it');
  });
  
server.get('/getname', (req, res) => {
    const name = req.session.name;
    res.send(`hello ${req.session.name}`);
  });

///////////////////// Endpoints

server.post('/register', (req, res) => {
    const user=req.body;

    const hash=bcrypt.hashSync(user.password, 14);
    user.password=hash;

    db('users')
    .insert(user)
    .then(function(ids){
        db('users')
        .where({id:ids[0]})
        .first()
        .then(user => {
            //generate token
            const token= generateToken(user);
            // req.session.username=user.username;

            // attach the token to the response
            res.status(201).json({token})
        });
    })
    .catch(error =>{
        res.status(500).json(error)
    })
});

const secret= 'nobody tosses a dwarf!' /// usually in separate file

function generateToken(user){
    const payload={
        username:user.username,
    };

    const options={
        expiresIn: '1h',
        jwtid:'asdf'
    };

    return jwt.sign(payload, secret, options);
};

function protected(req, res, next){
    const token= req.headers.authorization;
    if(token){
        jwt.verify(token, secret, (err,decodedToken)=>{
            if(err){
                return res.status(401).json({error:'Incorrect credentials'})
            }
            req.jwtToken=decodedToken;
            next();
        })
    } else{
        return res.status(401).json({error:'You shall not pass!'})
    }
    
    
    // if(req.session && req.session.username==='Alex'){
    //     next();
    // } else  {
    //     return res.status(401).json({error:'Incorrect credentials'})
    // }
};

server.post('/login', (req, res)=> {
    const credentials=req.body;
    db('users')
    .where({ username:credentials.username })
    .first()
    .then(function (user) {
        if (user && bcrypt.compareSync(credentials.password, username.password)) {
            //generate the token
            const token= generateToken(user);

            //req.session.username=user.username;

            //attach token to the response
            res.send(`Welcome ${user.username}`);
        } else {
            return res.status(401).json({ error: 'Incorrect credentials'});
        }
    })
    .catch(function(error){
        res.status(500).json({error});
    });
});

server.get('/users', protected, (req, res) => {
    console.log('token', req.jwtToken);
    db('users')
    .then(user=>{
        res.status(200).json(user);
    })
    .catch(error=> res.status(500).json(error));
});









///////////////////// Endpoints

const port = 7700;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});