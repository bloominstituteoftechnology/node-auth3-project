const router = require('express').Router();

const Users = require('./users-model');
const restricted = require('../auth/restricted-middleware.js');
const checkRole = require('../auth/check-role-middleware.js');

router.get('/', restricted, checkRole('mero mero'), (req, res) => {
    Users.find()
        .then(users => {
            res.json({ loggedInUser: req.username, users });
        })
        .catch(error => {
            res.send(error);
        });
});

module.exports = router;