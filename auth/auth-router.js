// Set Router. Import bcrypt/jwt libraries.
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('../users/users-model.js');
const secrets = require('./secrets.js');

// Register User. Post. **Postman Tested: Working + password hashed**
router.post('/register', (req, res) => {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 12); //hash password
    user.password = hash;

    if(!user.name && !user.password && !user.department) {
        res.status(401).json({ message: "Please provide a username, password, and department for this user."})
    } else {
        db.addNew(user)
        .then(regUser => {
        res.status(201).json(regUser)
        })
        .catch(err => {
        res.status(500).json(err.message)
        })
    }
});

// Login User. Post. **Postman Tested: working + returning a token**
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.findUserBy({ username })
    .first()
    .then(user => {
        if(user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user); //create token
            res.status(200).json({
                message: `Welcome, ${user.username}, enjoy my app.`,
                token,
            })
        } else {
            res.status(401).json({ message: "Please provide valid credentials."})
        }
    })
    .catch(err => {
        res.status(500).json(err.message)
    })
});


// Generate Token
function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        roles: user.department,
    };

    const options = {
        expiresIn: '2h',
    };

    return jwt.sign(payload, secrets.jwtSecret, options)
};


module.exports = router;