console.log("Hey! index.js is a working!");

//practice user in db reference
//username: The Book of Tacos ,password: tacosauce3 , id: 5
//or: The Pretzel Queen, cats1, id: 4

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('morgan');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());
server.use(cors());
server.use(logger('combined'));
server.use(helmet());

//server tester message
server.get('/', (req, res) => {
  res.send('Its Alive!');
});

//register
server.post('/api/register', (req, res) => { 
    const credentials = req.body;
      const hash = bcrypt.hashSync(credentials.password, 14);
    credentials.password = hash;
    db('users').insert(credentials).then(ids => {
      const id = ids[0];
      res.status(201).json({ newUserId: id })
    })
    .catch(err => {
      res.status(500).json(err);
    });
  });
  
  const jwtSecret = 'bananas are gross!'; 

  function generateToken(user) {
    const jwtPayload ={
        ...user,
        hello: 'FSW13',
        role: 'admin', 
    };
    const jwtOptions = {
        expiresIn: '1m',
    };
        return jwt.sign(jwtPayload, jwtSecret, jwtOptions);
    }
    
    //login
server.post('/api/login', (req, res) => {
    const credentials = req.body;
    db('users').where({username: credentials.username}).first().then(user => {
      if(user && bcrypt.compareSync(credentials.password, user.password)) { //how we know the user is logged in
      const token = generateToken(user); //generates a token for user after confirmed login
    res.status(200).json({ welcome: user.username, token })
      } else {
        res.status(401).json({ message: "You Shall Not Pass!" })
      }
    })
    .catch(err => res.status(500).json({ err }));
  });

//get uers
  server.get('/api/users', protected, (req, res) => {
    console.log('\n** decoded token information, only appears if token is validated **\n', req.decodedToken);
  db('users') .select('id', 'username', 'password').then(users => {
    res.json({ users });
  })
  .catch(err => res.send(err));
});

//THe header to use is: authorization
//validating the token next line, if the token is true-do this, else send back this status
   //the library has a methd called verify, we will use it to check the token is valid
// you verify token, secret, and (err, decodedToken) -
function protected(req, res, next) {
    const token = req.headers.authorization;
    if(token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if(err) {
            //token varification failed, this is how the library will tell us if the token  
            //has been tampered with
            res.status(401).json({ message: 'invalid token!!, not authorized!'});
            } else {
            //token is valid
              req.decodedToken =  decodedToken;
              next();// we can calll next, just move on, and console.log the decodedToken in get.('/users') above
            }
        });
    } else {
            //401 = not authorized, normally you wouldn not want to tell Why, this failed, like no token provided
            //but for our demo we are adding it, But dont do this in real life k!
            res.status(401).json({ message: 'not token provided, not authorized!' });
        }
    }

    //here we are going to check the role of the entered user
   
        //this is saying, hey check the role from this token, and see if it is the role that I am expecting
    function checkRole(role) {
        return function(req,res, next) {
            if(role === 'admin') { 
             next();
            } else {
                res.status(403).json({ message: 'You are sooooo not authorized to do that' });
            }
        }
    }
            //if we implement this line of code after 'protected' middleware has been written
            //then we can assume that there could be a decoded token
            //we are saying here, if we have this decoded token, and the role inside happens to be
            //the role I'm looking for, then you can continue (next()), "otherwise, I forbid you!"
            //we are expecting role to = admin remember
                //to check for a user with multiple roles use includes() like so...
            //if(req.decodedToken.role && req.decodedToken.roles.includes(role) {  next(); })
        

server.listen(9000, () => console.log('\n API running mad circles on port 9000\n')); //It's over 9000!
