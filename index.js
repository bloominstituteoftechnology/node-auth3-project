require('dotenv').config();

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors')

const db = require('./database/dbConfig.js');

const server = express();

server.use(express.json());
server.use(cors());

server.get('/api', (req, res) => {
    res.send('Its Alive!');      
})

//USER REGISTER... INTO DATABASE 'USERS'
server.post('/api/register', (req, res) => {
    const credentials = req.body;
    const hash = bcrypt.hashSync(credentials.password, 6);
    credentials.password = hash;
    db('users').insert(credentials)
               .then(ids => {
                    res.status(201).json(ids);
                })
               .catch(err => res.send(err));
});

//FUNCTION TO GENERATE TOKEN WHICH WILL BE SAVED AT CLIENT END..
function generateToken(user) {
    const payload = {
          subject : user.id,
          username : user.username,
          roles : user.department, //from database..
    };
    const secret = process.env.JWT_SECRET;

    const options = {
           expiresIn : '1h',
    };

    return jwt.sign(payload, secret, options);
}

//USER LOGIN...To check authenticated users
server.get('/api/login', (req, res) => {
        console.log(req.body);
        const credentials = req.body;
        db('users')
                .where({ username : credentials.username })
                .first()
                .then(user => {
                     if(user && bcrypt.compareSync(credentials.password, user.password)) {
                            const token = generateToken(user);
                            res.status(200).json({message : "Logged In", token});
                     } else {
                            res.status(401).json({message : "Invalid username or password.."})
                     }
                 })
                .catch(err => res.send({Message : "Error in Logging In..."}));
})

//FUNCTION PROTECTED MIDDLEWARE TO GET LOGGED_IN USER
function protected(req, res, next) {
    //token sent in Authirization header
    const token = req.headers.authorization;

    if (token) { //IF TOKEN IS THERE CHECK FOR VALIDATION USING "jwt.verify"
            jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => { 
                if (err) { //IF "jwt.veryfy" returns err ... INVALID TOKEN
                    res.status(401).json({ message: 'invalid token' });
                } else { //EITHER TOKEN IS VALID AND WILL RETURN DECODED_TOKEN
                    req.decodedToken = decodedToken;
                    next();
                }
            });
    } else {
        res.status(401).json({ message: 'not token provided' });
    }
}

//GET LOGGED IN USER -- only authenticated user should see it
server.get('/api/me', protected, (req, res) => {
      const userID = req.decodedToken.subject;
      console.log(userID);
      db('users')
              .select('id', 'username', 'password')
              .where({ id : userID })
              .first()
              .then(user => {
                   res.json(user);
               })
              .catch(err => res.send({Message : 'not getting user info..'})); 
})

//ANOTHER MIDDLEWARE 'CHECKROLE' TO DISPLAY DEPARTMENT-WISE USER LIST
function checkRole(role) {
    return function (req, res, next) {
         if(req.decodedToken && req.decodedToken.roles === 'sales') {
               next();
         } else {
               res.status(403).json({message : 'You have no access to this resource..'});
         }
    };
}

//GET TO SEE USER LIST ACCORDING TO ROLE
server.get('/api/users', protected, checkRole('sales'), (req, res) => {
    console.log(req.decodedToken.roles);
     db('users')
            .select('id', 'username', 'department')
            .where({department : req.decodedToken.roles})
            .then(users => {
                  res.json(users);
             })
            .catch(err => res.send(err));
})

server.listen(3300, () => console.log('\nrunning on port 3300\n'));