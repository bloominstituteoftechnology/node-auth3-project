const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../users/users-model.js');
const secrets = require('../config/secrets')


router.post('/register', (req,res)=> {
    let user =req.body;
    const hash = bcrypt.hashSync(user.password,10);
    user.password = hash;

    Users.add(user)
    .then(saved => {
        res.status(201).json(saved);
    })
    .catch(err => {
        res.status(500).json(err)
    });
});


router.post('/login', (req,res)=>{
    let {username, password}= req.body;
     console.log(req.headers)
    Users.findBy({username})
    .first()
    .then(user => {
        if (user && bcrypt.compareSync (password, user.password)){
            const token = getToken(user)

            res.status(200).json({
                message: `Welcome ${user.username}! ${token}`
                
            });
        }else{
            res.status(401).json({message: 'Invalid credentials'})
        }
    })
    .catch(err=> {
        res.status(500).json(err)
    })

})

 

function getToken(user){
    const payload ={
      subject: user.id,
      username: user.username,
      department:user.department
    };
    const secret = secrets.jwtSecret;
    const options = {
      expiresIn: '1d'
    };
     
  
   return jwt.sign(payload, secret, options);
   
  
  }
  router.get('/logout', (req,res)=>{
    if(req.session){
      req.session.destroy(err => {
        if(err){
          res.send(' you can check out any time you like, but you can never leave')
        }else{
          res.send('bye, thanks for all the fish.')
        }
      })
    }else{
      res.status(200).json({message: 'logged out'})
    }
  })


module.exports = router;
