require('dotenv').config();

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userDb = require('./userModel.js');
const router = express.Router();

const jwtSecret = process.env.JWT_SECRET || 'Specify a JWT Secret';

// Route to return all users
router.get('/users', protected, (req, res) => {
    // Return all the users
    userDb.get().then(users => {
        res.status(200).json(users);
    }) .catch(err => res.status(500).json(err));
});

// Register the user
router.post('/register', registerValidation, (req, res) => {
    const creds = req.body;
    // Hash the password
    const hash = bcrypt.hashSync(creds.password, 14);
    creds.password = hash;

    // Add the user to the database
    userDb.add(creds).then(ids => {
        const id = ids[0];
        console.log(ids);
        userDb.getByUsername(creds.username).then(user => {
            const token = generateToken(user);
            if(!user) return res.status(404).json({message: 'User not found' });
            res.status(200).json({ token: token });
        }).catch(err => {
            res.status(500).json(err.message);
        })
    })
    .catch(err => {
        res.status(500).json(err.message);
    });
});

// Login the user
router.post('/login', (req, res) => {
    const creds = req.body;

    // Return the username
    userDb.getByUsername(creds.username).then(user => {
        if (!user) return res.status(401).json({ message: 'Username or password is incorrect'});

        // Compare the passwords from the user to the DB
        if(user && bcrypt.compareSync(creds.password, user.password)) {
            // Generate a JSON Web Token
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
// Rejects anyone who is not authorized
function protected(req, res, next) {
    const token = req.headers.authorization;

    // Check if the token exists
    if(token) {
        // Verify that the token is valid
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if(err) return res.status(401).json({message: 'Invalid token'});

            req.decodeToken = decodedToken;
            next();
        });
    } else {
        res.status(401).json({ message: 'Not Authorized'});
    }
};

// Executes when the user registers
function registerValidation(req, res, next) {
    const user = req.body;

    // Check if non-nullable fields exists
    if(!user.username) return res.status(404).json({message: 'You need to specify a username'});
    if(!user.password) return res.status(404).json({message: 'You need to specify a password'});
    if(!user.department) return res.status(404).send({message: 'You need to specify a department'});

    // Check if there is already a user in the DB that exists
    userDb.getByUsername(user.username).then(user => {
        if(user) return res.status(409).json({message: 'That username is already taken.'});
        next();
    })
    .catch(err => {
        res.status(500).json(err);
    });
};

// FUNCTIONS
// Generate a JSON Web Token
function generateToken(user) {
    const jwtPayload = user;
    const jwtOptions = {
        expiresIn: '3m'
    };

    return jwt.sign(jwtPayload, jwtSecret, jwtOptions);
};



module.exports = router;