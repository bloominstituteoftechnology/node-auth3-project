const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../middleware/secrets');

const Users = require('../users/model');

function genToken(user) {
    const payload = {}
    const options = {}
    const token = jwt.sign(payload, secrets.jwtSecret, options);
    return token;
}

// POST/REGISTER


// POST/LOGIN




module.exports = router;