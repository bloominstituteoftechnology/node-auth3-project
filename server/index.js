// We can use JSON web tokens (JWTs) to add authentication to a Web API. A JSON web tokens is an industry standard for transferring data between two parties.
// JWTs are cryptographically signed, typically using a secret with the HMACSHA-256 algorithm.
// NOTE: FOR WHEN I HAVE APPS GO LIVE, USE OATH & REDIS or OPENID CONNECT & OATH


const express = require('express');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const bcrypt  = require('bcryptjs')
const knex = require('knex');
const knexConfig = require('./knexfile');
const cors = require('cors');

// We use the db constant to interact with our database.
const db = knex(knexConfig.development);
const server = express();

server.use(express.json());
server.use(cors())


const secret = 'nobody tosses a dwarf!';

// function generateToken(user) {
//     const payload = {
//         username: user.username
//     };
//     const options = {
//         expiresIn: '2h'
//     };
//     return jwt.sign(payload, secret, options);
// }

// This middleware verifies that we have a session and that the userId is set. We could use username or any other value we can use to verify access to a resource.
function protected(req, res, next) {
    const token = req.headers.authorization;

    // if (req.session && req.session.username === 'Adrian27') {
    //   next();
    // } else {
    //   res.status(401).json({ message: 'Incorrect credentials' });
    // }
    console.log('jeepers')
    console.log(token)
    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => { //this decodedToken callback is "the key"
            if (err) {
                return res.status(401).json({ message: 'Incorrect credentials - token invalid' });
            }
            req.jwtToken = decodedToken; //Not required. See 1:19:08 in the json web token lecture. 
            next();
            })
    }
    else {
        res.status(401).json({ message: 'Incorrect credentials - no token' }); 
    }
  }
// 
function roles(req,res,next) {
    return function(roles) {
        if (req.session && req.session.username == 'Adrian27') {
            // "find the user in the db by the user id in the cookie"
            // "check that the user has one of the roles allowed"
            next();
        } else {
            return res.status(401).json({error: "Incorrect credentials"})
        }
    };
}

function generateToken(user) {
    const payload = {
        username: user.username
    };
    const options = {
        expiresIn: '2h',
        jwtid: '07151987'
    };
    return jwt.sign(payload, secret, options);
}

// REGISTER
// Creates a user using the information sent inside the body of the request. Hash the password before saving the user to the database.
server.post('/api/register', (req,res) => {
const user = req.body; 
// console.log(user)
//hash password
const hash = bcrypt.hashSync(user.password, 10);
user.password = hash;
 
db('users')
    .insert(user)
    // .into('users')
    .then(ids => {

        db('users')
            .where({id: ids[0]})
            .first()
            // .then(function(user) {
            //     // generate the web token
            //     console.log(user)
            //     const token =generateToken(user);
            //     console.log(token)
            //     // req.session.username = user.username

            //     //attach token to the response
            //     res.status(201).json(token);
            // })
            .then(user => {
                // generate the web token
                const token =generateToken(user);
                // req.session.username = user.username

                //attach token to the response
                res.status(201).json(token);
            });
    })
    .catch(err => res.status(500).json({err}));
});




//LOGIN
server.post('/api/login', (req,res) => {
//to verify a password
const credentials = req.body;

db('users')
    .where({username:credentials.username})
    .first()
    .then(user => {
        if (user && bcrypt.compareSync(credentials.password, user.password)) {
            // generate web token
            const token = generateToken(user);
            // console.log(token)
            // req.session.username = user.username;

            //attach token to the response
            res.send(token)
        } else {
            return res.status(401).json({error: 'Incorrect credentials'});
        }
    })

    // .then(function(user) {
    //     console.log('hello')
    //     if (user && bcrypt.compareSync(credentials.password, user.password)) {
    //         // generate web token
    //         const token = generateToken(user);
    //         // console.log(token)
    //         // req.session.username = user.username;

    //         //attach token to the response
    //         res.send(token);
    //     } else {
    //         return res.status(401).json({error: 'Incorrect credentials'});
    //     }
    // })
    
    .catch(error => {
        res.status(500).json({error});
    })

    //  // from tk notes
// //find the user in the database by it's username then
// if (!user || !bcrypt.compareSync(credentials.password, user.password)) {
//     return res.status(401).json({error: 'Incorrect credentials'});
// }

// db.insert()
}); 


// GET	    /api/users	    If the user is logged in, respond with an array of all the users contained in the database. If the user is not logged in repond with the correct status code and the message: 'You shall not pass!'. Use this endpoint to verify that the password is hashed before it is saved.
// server.get('/api/users', protected, (req, res) => {
server.get('/api/users', (req, res) => {
    console.log('token', req.jwtToken)
    console.log('bleep')
    db('users')
        .select('id','username')     // for the purposes of the client for access to the /api/users data.
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            console.log('hello')
            res.send(err)
        });
        
}); 

//add the basic code to create our Express server and have a default / endpoint we can use to test that our server is responding to requests.
server.use('/', (req, res) => res.send('API up and running!'));


server.listen(9000, ()=> console.log('API running on port 9000'));