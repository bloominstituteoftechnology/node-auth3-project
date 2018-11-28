require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');

const db = require('./database/dbConfig.js');

const server = express();

server.use(express.json());
server.use(cors());

//----api connection----
server.get('/', (req, res) => {
    res.send('This is my funcitoning server');
});

//=====MIDDLEWARE=====
function generateToken(user) {
   
    const payload = {
      subject: user.id,
      username: user.username,
      department: user.department
     
    };
  
    const secret = process.env.JWT_SECRET;
    // const secret = 'adfqet';
    const options = {
      expiresIn: '1h',
    };
  
    return jwt.sign(payload, secret, options);
}


function protected(req, res, next){
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if(err) {
                //invalid token
                res.status(401).json({message: "invalid token"});
            } else {
                //token is verified
                req.decodedToken = decodedToken;
            }
        })
        next();
    } else {
        res.status(401).json({message: "no token provided"});
    }
}


//===========================ENDPOINTS===================================



//==========LOGIN==========
server.post('/api/login', (req, res) => {
    const creds = req.body;

    db('users')
    .where({ username: creds.username })
    .first()
    .then(user => {
        if(user && bcrypt.compareSync(creds.password, user.password)) {
            const token = generateToken(user);
            res.status(200).json({message: "Logged in!", token}); //only including token for dev purposes
        } else {
            res.status(401).json({message: "Either username is invalid or password is incorrect"});
        }
    })
    .catch(err => res.status(401).json({message: "Error logging you in"}));
});

//==========REGISTER=========
server.post('/api/register', (req, res) => {
    //get username and password from body
    const creds = req.body;

    //hash that password
    const hash = bcrypt.hashSync(creds.password, 6);

    //override pass with my new hash
    creds.password = hash;

    //save that info to my db
    db('users')
    .insert(creds)
    .then(ids => {
        res.status(201).json({message: "Registration Successful", ids}) //if reg doesnt work, try removing ids
    })
    .catch(err => res.status(400).json({error: "Unable to Register", err}));
});




server.listen(8800, () => console.log('\nrunning on port 8800\n'));