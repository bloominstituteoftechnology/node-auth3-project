const express = require('express');
const userDb = require('./userModel.js');
const router = express.Router();

// Route to return all users
router.get('/users', (req, res) => {
    // Return all the users
    userDb.get().then(users => {
        res.status(200).json(users);
    }) .catch(err => res.status(500).json(err));
});

module.exports = router;