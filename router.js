const express = require('express');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const Users = require('./data-model');
const secrets = require('./secrets');
const restricted = require('./middleware');
const router = express.Router();

router.post('/register', (req,res) => {
    const newUser = req.body;
    const hash = bcrypt.hashSync(newUser.password, 12)

    newUser.password = hash;

    Users.add(newUser)
        .then(added => {
            res.status(201).json('New user has been added to the database')
        })
        .catch(err => {
            res.status(400).json({ error: "New user can't be added to the database" })
        })
})


router.post('/login', (req,res) => {
    const {username, password} = req.body;

    Users.findBy({username})
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)){
                const token = generateToken(user);
                res.status(200).json({ message: 'Welcome', token})    
            }else{
                res.status(401).json({ error: 'Invalid credentials' })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
})


router.get('/users', restricted, (req,res) => {
    Users.find()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.status(500).json({ error: 'Couldnt get list of users from the database' })
        })

})

router.get('/logout', (req,res) => {
    if(req.session){
        req.session.destroy(err => {
            if(err){
                res.json({ message: "You can checkout but you can't leave" })
            }else{
                res.status(200).json({ message: 'Bye thanks for coming' })
            }
        })
    }else{
        res.status(400).json({ message: 'You were never here to begin with' })
    }
});

function generateToken(user){
    const payload = {
        subject: user.id,
        username: user.username
    }
    const options = {
        expiresIn: '8h'
    }
    return jwt.sign(payload, secrets.jwtSecret, options)
}

module.exports = router;
