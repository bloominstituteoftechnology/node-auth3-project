const express = require('express');
const db = require('../data/dbConfig');

const router = express.Router();

//get all saved users, if logged in
router.get('/users', (req, res) => {

});

module.exports = router;
