// Imports all modules required to run app correctly
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../../config/secrets.js');

// Gains access to the Users table via the functions defined in the users-model file.
const Users = require('../users/users-model.js');

// The following endpoints are for the /api/auth route

// This creates a new user in the table
router.post('/register', (req, res) => {
    let newUser = req.body;
    let {username, password, department} = req.body;

    const hash = bcrypt.hashSync(newUser.password, 10);
    newUser.password = hash;

    if (!username || !password || !department) {
        res.status(400).json({message: "Missing username, password, or department field"})
    }

    Users.add(newUser)
    .then(newUserAdded => {
        res.status(201).json(newUserAdded);
    })
    .catch(error => {
        res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
    let {username, password} = req.body;
    Users.findBy({username})
    .first()
    .then(user => {
        if (user && bcrypt.compareSync(password, user.password)){
            const token = createToken(user)
            res.status(200).json({message: `Welcome ${user.username}`, token})
        }
        else if (!user) {
            res.status(404).json({message: "Credentials not valid, user does not exist!"})
        } else {
            res.status(401).json({message: "Credentials are invalid!"})
        }
    })
    .catch(error => {
        res.status(420).json({error, message: "Enhance your calm, there was an error"})
    })
})

function createToken (user) {
    const payload = {
        subject: user.id,
        username: user.username,
    }
    const options = {
        expiresIn: '1h',
    }
    return jwt.sign(payload, secrets.jwtSecret, options)
}

module.exports = router;