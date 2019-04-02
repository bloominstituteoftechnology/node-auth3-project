require('dotenv').config();

const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model');

const genToken = user => {
    const payload = {
        subject: user.id,
        username: user.username
    }

    const options = {
        expiresIn: '6h'
    }

    const secret = process.env.SECRET;

    return jwt.sign(payload, secret, options);
}

//register
router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 7);

    user.password = hash;

    Users.add(user)
         .then(id => {
             res.status(201).json({ status: 201, message: success });
         })
         .catch(err => {
             res.status(500).json({ error: err, message: 'Registration Failed' });
         });
});

//Login
router.post('/login', (req, res) => {
    let { username, password } = req.body;
    console.log(username, password)
Users.findBy({ username })
    .first()
    .then(user => {
        if(user && bcrypt.compareSync(password, user.password)) {
            const token = genToken(user);

            res.status(200).json({
                message: `Welcome ${user.username}`,
                token
            });
        } else {
            res.status(401).json({ message: 'Invalid Credentials' })
        }
    })
    .catch(err => {
        res.status(500).json({ 
            message: 'Could Not Log In',
            err
        })
    })
});

module.exports = router;