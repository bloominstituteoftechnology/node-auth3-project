const express = require('express');

const authenticate = require('../middleware/authenticate.js');
const usersDB = require('../data/helpers/usersHelper.js');

const router = express.Router();

router.use(authenticate);

router.get('/', (req, res) => {
    usersDB.getUsers()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).json({err: "Server error"});
        });
});

module.exports = router;