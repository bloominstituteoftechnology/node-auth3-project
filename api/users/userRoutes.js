const express = require('express');
const db = require('../../data/db');
const { loginCheck } = require('../../middleware/required');

const router = express.Router();

router.get('/', loginCheck, (req, res) => {
    db('users')
        .where('id', req.jwtToken.userId).first()
        .then(response => {
            db('users')
                .whereRaw('LOWER("department") = ?', response.department.toLowerCase())
                .then(response => res.status(200).json(response))
                .catch(err => res.status(500).json({ error: "Couldn't retrieve the users information" }));
        })
        .catch(err => res.status(500).json({ error: "Couldn't retrieve the user information" }));
})

module.exports = router;