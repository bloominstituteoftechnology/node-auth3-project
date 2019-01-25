const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const knex = require('knex');
const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(cors());
const secret = 'backtothefuture'; // not hardcoded, env variable

function generateToken(user){
    const payload = {   // no sensitive passwords here
        username: user.username,
        department: user.department,
    };

    //const secret = 'backtothefuture';

    const options = {
        expiresIn: '1h',
        jwtid: '12345' //jti
    }

    return jwt.sign(payload, secret, options); // anatomy of JSON webtoken
}




server.post('/api/register', (req, res) => {
    const creds = req.body;
    const hash = bcrypt.hashSync(creds.password, 10); //override original password to hash
    creds.password = hash;
    //let id = '';

    db('users')
        .insert(creds)
        .then(ids => {
            const id = ids[0];

        //find user using id
        db('users')
            .where({id})
            .first()
            .then(user => {
                const token = generateToken(user);
                res.status(201).json({ id: user.id, token });
            })
            .catch(err => res.status(500).send(err));
    })
    .catch(err => {
        res.status(500).send(err);
    });
});


function protect(req, res, next){
    // use jwts instead of sessions
    // read the token string from the Authorization header
    const token = req.headers.authorization;

    if(token){
        // verify the token
        jwt.verify(token, secret, (err, decodedToken) => {
            if(err){
                //token is invalid
                res.status(401).json({message: 'Invalid Token'});
            } else {
                //token is valid
                console.log(decodedToken);
                req.username = decodedToken.username;
                //req.user.department = decodedToken.department; //grab department?
                next();
            }
        });
        // we care about difference between no token vs invalid token
        // because a tamper token signals an attack
    } else {
        res.status(401).json({message: 'no token provided' });
    }
}


server.post('/api/login', (req, res) => {
    const creds = req.body;

    db('users')
        .where({ username: creds.username })
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(creds.password, user.password)) {
                // generate a token
                const token = generateToken(user);

                // attach that token to the response
                res.status(200).json({ token });
            } else {
                res.status(404).json({ err: "invalid username or password"});
            }
        })
        .catch(err => {
            res.status(500).send(err);
        })
});

//
server.get('/api/users', protect, (req, res) => {
    // NOTE: see library express-jwt gives req.user with secret key for authorizing certain personnel
    // see PASSPORTJS for using 3rd party social accts for authentication
    
    // if (req.user.department.includes('HR')){

    // }

    db('users').select('id', 'username', 'password')
    .then(users => {
        res.json(users);
    })
    .catch(err => {
        res.status(500).send(err);
    })
})


// FOR LOGOUT WE REMOVE TOKEN FROM LOCALSTORAGE on CLIENT 
// BECAUSE TOKENS ARE NOT STORED ON SERVER (so no endpoint)

server.get('/', (req , res) => {
    res.send('JSON Web Token Session Starting...');
});

server.listen(3500, () => console.log('\nrunning on port 3500\n'));