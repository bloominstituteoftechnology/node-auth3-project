const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userDb = require('./userModel.js');
const router = express.Router();

const jwtSecret = 'this is[asecret#3that.nob0dy-knows.'

// Route to return all users
router.get('/users', protected, (req, res) => {
    // Return all the users
    userDb.get().then(users => {
        res.status(200).json(users);
    }) .catch(err => res.status(500).json(err));
});

router.post('/register', registerValidation, (req, res) => {
    const creds = req.body;
    const hash = bcrypt.hashSync(creds.password, 14);
    creds.password = hash;

    userDb.add(creds).then(ids => {
        const id = ids[0];
        res.status(201).json({ newUsersId: id });
    })
    .catch(err => {
        res.status(500).json(err.message);
    });
});

router.post('/login', (req, res) => {
    const creds = req.body;

    userDb.getByUsername(creds.username).then(user => {
        if (!user) return res.status(401).json({ message: 'Username or password is incorrect'});
        if(user && bcrypt.compareSync(creds.password, user.password)) {
            const token = generateToken(user);
            res.status(200).json({ welcome: user.username, token: token });
        } else {
            res.status(401).json({ message: 'You shall not pass!'});
        }
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

// MIDDLEWARE
function protected(req, res, next) {
    const token = req.headers.authorization;

    if(token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if(err) return res.status(401).json({message: 'Invalid token'});

            req.decodeToken = decodedToken;
            next();
        });
    } else {
        res.status(401).json({ message: 'Not Authorized'});
    }
};

function registerValidation(req, res, next) {
    const user = req.body;
    if(!user.username) return res.status(404).json({message: 'You need to specify a username'});
    if(!user.password) return res.status(404).json({message: 'You need to specify a password'});
    if(!user.department) return res.status(404).json({message: 'You need to specify a department'});

    // const newUser = userDb.getByUsername(user.username);
    // if(newUser.length < 1) return res.status(409).json({message: 'That username is already taken.'});

    next();
}

// FUNCTIONS
function generateToken(user) {
    const jwtPayload = user;
    const jwtOptions = {
        expiresIn: '3m'
    };

    return jwt.sign(jwtPayload, jwtSecret, jwtOptions);
};



module.exports = router;