const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logger = require('morgan');

const db = require('./database/dbHelpers.js');
const PORT = 3500;

const server = express();
server.use(express.json())

const cors = require('cors');
server.use(cors());
server.use(logger('tiny'));

const secret = 'secretpassword';

// Custome Middleware
function protect(req, res, next) {
   const token = req.headers.authorization;
 
   jwt.verify(token, secret, (err, decodedToken) => {
     if (err) {
       res.status(401).json({ message: 'Invalid token'}); 
     } else {
       next();
     }
   });
 }

 function generateToken(user) {
   const payload = {
     username: user.username,
   };
 
   const options = {
     expiresIn: '1h'
   };
 
   return jwt.sign(payload, secret, options);
 }

server.post("/api/register", (req, res) => {
   const user = req.body;
   if (user.username && user.password){
   user.password = bcrypt.hashSync(user.password, 10);
   db.insert(user)
      .then(ids => {
         db.findById(ids[0])
            .then(user => {
               if(user){
                  const token = generateToken(user);
                  res.status(201).json({id: user.id, token});
               } else {
                  res.status(404).send("User not found");
               }
            })
           })
      .catch(err => {
         res.status(500).send(err);
      })
    } else res.status(400).json({err: "please provide a username and password"});
});

 server.post('/api/login', (req, res) => {
   const creds = req.body;
   db.findByUsername(creds.username)
   .then(user => {
     if (user && bcrypt.compareSync(creds.password, user.password)) {
       const token = generateToken(user)
       res.json({ id: user.id, token });
     } else {
       res.status(404).json({err: "invalid username or password"});
     }
   })
   .catch(err => {
     res.status(500).send(err);
   });
 });

 server.get('/api/users', protect, (req, res) => {
   db.findUsers()
   .then(users => {
     res.json(users);
   })
   .catch(err => {
     res.status(500).send(err);
   })
 });

//SERVER

server.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
});