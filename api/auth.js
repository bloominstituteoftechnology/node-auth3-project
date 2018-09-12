const express = require('express');
const db = require('../data/dbConfig');
const bcrypt = require('bcryptjs');

const router = express.Router();

//create a new user
router.post('/register', (req, res) => {

});

//login a user
router.post('/login', (req,res) => {

});

module.exports = router;
