const router = require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('./User');

const secret = 'Derrick is really Kevin';

function restricted(req, res, next) {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                res.status(401).send('Your token is incorrect');
            } else {
                req.jwtPayload = decodedToken;
                next();
            }
        });
    } else {
        res.status(401).send('You have no token, please login to get token');
    }
}

router.get('/', restricted, (req, res) => {
    const race = req.jwtPayload.race;
    User.find()
        .where('race')
        .equals(race)
        .select('-password')
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;
