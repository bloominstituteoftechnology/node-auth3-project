const router = require('express').Router();
const bcrypt = require('bcryptjs')
const Users = require('../models/user-model.js')
const jwt = require('jsonwebtoken');



router.post('/register', (req,res) =>{
    const user = req.body;

    const hash = bcrypt.hashSync(user.password, 12)
    user.password = hash;
    
    Users.insert(user)
        .then(userN => {
            res.status(200).json(userN)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json(error);
          });
})

router.post('/login', (req,res) =>{
    let { username, password } = req.body;

    Users.filtering({username})
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)){
                const token = generateToken(user);
                res.status(200).json({
                    message: `Welcome ${user.username}! Here's a token...`,
                    token,
                  });
            }
            else{
                res.status(401).json({ message: 'Invalid Credentials' })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({message: `error logging user in!`})
        })
})


function generateToken(user){
    const payload = {
        username: user.username,
        subject:user.id,
        department: user.department
    };
    const options ={
        expiresIn: '1d'
    };
    return jwt.sign(payload, process.env.JWT_SECRET, options);
}
module.exports = router;