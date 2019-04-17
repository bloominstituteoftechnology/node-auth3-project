const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');

const Users = require('../users/user-model.js');

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    Users.add(user)
      .then(saved => {
          res.status(201).json(saved);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user);

            res.status(200).json({
                message: `Welcome ${user.username}!, we have been waiting for you here\'s your token...`,
                token
            });
        } else {
            res.status(401).json({ message: 'You shall not pass!'});
        }
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        roles: ['Authorized User']
    }
    const options = {
        expiresIn: '1d'
    }
    return jwt.sign(payload, secrets.jwtSecret, options)
}

module.exports = router;