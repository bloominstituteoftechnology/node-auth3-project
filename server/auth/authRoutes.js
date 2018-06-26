const router = require('express').Router();
const jwt = require('jsonwebtoken');
//Do we need CORS here or just inside server.js?

const secret = 'Derrick is really Kevin';

const User = require('../users/User');

function generateToken(username, race) {
    const options = {
        expiresIn: '1h'
    };
    const payload = { name: username, race };
    return jwt.sign(payload, secret, options);
} //Generate and return Token with payload containing name and race

router.post('/register', function(req, res) {
    User.create(req.body)
        .then(({ username, race }) => {
            // we destructure the username and race to avoid returning the hashed password

            // then we assemble a new object and return it
            const token = generateToken(username, race);
            res.status(201).json({ username, race, token });
        })
        .catch(err => {
            console.log('register error: ', err.message);
            res.status(500).send(err);
        });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username })
        .then(user => {
            if (user) {
                user.validatePassword(password)
                    .then(passwordsMatch => {
                        if (passwordsMatch) {
                            const token = generateToken(username, user.race);
                            res.status(200).json({
                                message: `Welcome back ${username}`,
                                token
                            });
                        } else {
                            res.status(401).send('passwords do not match');
                        }
                    })
                    .catch(() => {
                        res.status(500)
                            .json({ message: 'error validating password' })
                            .end();
                    });
            }
        })
        .catch(() => {
            res.status(500)
                .json({ message: 'server error logging you in' })
                .end();
        });
});

module.exports = router;
