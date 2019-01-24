const express = require('express');
const bcrypt = require('bcryptjs');
const logger = require('morgan');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const server = express();
// Database 
const db = require('./database/dbHelper.js');
//PORT
const PORT = 5500;
//Server
server.use(express.json());
server.use(logger('dev'));
server.use(cors());
//Initial get request
server.get('/', (req,res) => {res.json(`Server is and running`); })
// Post - Register
server.post('/api/register', (req,res) => {
     const user = req.body;
     console.log(user);
   //   if(!user) res.status(404).json({Message:`There is no user now`});
     if(!user.username) res.status(400).json({Message: `Username required!`});
     if(!user.password) res.status(400).json({Message: `Password required!`});
     const hash = bcrypt.hashSync(user.password, 10);
     user.password = hash;
     db.insertUser(user)
       .then( ids => {
          const id = ids[0];
          console.log(id);
          db.findById(id)
            .then( user => {
               if(!user) res.status(404).json({Message: `There is no user with this ID`});
               res.status(201).json(user.username);
            })
       })
       .catch(err => {
          res.status(500).json({Message: `Failed to register at this time`});
       });
});

server.post('/api/login', (req,res) => {
      const user = req.body;
      const submittedPassword = user.password;
      if(!user.username) res.status(400).json({Message: `Username required for login!`});
      if(!submittedPassword) res.status(400).json({Message: `Password required for login!`});
      db.findByUsername(user.username)
        .then( user => {
           console.log(`Line 48`, user);
           if(!user) res.status(404).json({Message: `There is no user with this name`});
           if(user && bcrypt.compareSync(submittedPassword, user.password)) {
               res.status(200).json(user.id);
           } else {
               res.status(401).json({Message:`Invalid password or username`});
           }
        })
        .catch(err => {
            res.status(500).json({Message:`Failed to login at this time`});
        })
});

server.get('/api/users', (req,res) => {
     db.findUsers()
       .then( users=> {
           res.status(200).json(users);
       })
       .catch(err => {
           res.status(500).json({errorMessage: err});
       })
})

server.listen(PORT, () => {
   console.log(`Server is running at localhost://${PORT}`);
})