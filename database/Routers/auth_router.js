const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const db = require('../dbHelper.js');
const {protected, newToken} = require('../Middleware/custom_middleware');


// Post - Register
router.post('/api/register', (req,res) => {
  const user = req.body;
  
//   if(!user) res.status(404).json({Message:`There is no user now`});
  if(!user.username) res.status(400).json({Message: `Username required!`});
  if(!user.password) res.status(400).json({Message: `Password required!`});
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;
  console.log('line17',user);
  db.insertUser(user)
    .then( ids => {
       const id = ids[0];
       console.log(id);
       db.findById(id)
         .then( user => {
             console.log('line23', user);
            if(!user) res.status(404).json({Message: `There is no user with this ID`});
            const token = newToken(user);
            res.status(201).json({token: token, id: user.id});
         });
    })
    .catch(err => {
       res.status(500).json({Message: `Failed to register at this time`});
    });
});
//Post - login
router.post('/api/login', (req,res) => {
   const user = req.body;
   const submittedPassword = user.password;
   if(!user.username) res.status(400).json({Message: `Username required for login!`});
   if(!submittedPassword) res.status(400).json({Message: `Password required for login!`});
   db.findByUsername(user.username)
     .then( user => {
        console.log(`Line 48`, user);
        if(!user) res.status(404).json({Message: `There is no user with this name`});
        if(user && bcrypt.compareSync(submittedPassword, user.password)) {
            const token = newToken(user);
            res.status(200).json({token: token, id:user.id});
        } else {
            res.status(401).json({Message:`Invalid password or username`});
        }
     })
     .catch(err => {
         res.status(500).json({Message:`Failed to login at this time`});
     })
});

router.get('/api/users', protected, (req,res) => {
  db.findUsers()
    .then( users=> {
        res.status(200).json(users);
    })
    .catch(err => {
        res.status(500).json({errorMessage: err});
    })
});




module.exports = router;