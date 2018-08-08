const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../../data/db');
const { registerPostCheck, generateToken } = require('../../middleware/required');

const router = express.Router();

router.post('/', registerPostCheck, (req, res) => {
    const user = { username: req.username, password: req.password, department: req.department }
    const hash = bcrypt.hashSync(user.password, 14);
    user.password = hash;
    db('users')
        .then(response => {
            for (let i = 0; i < response.length; i++) {
                if (response[i].username.toLowerCase() === user.username.toLowerCase()) {
                    return res.status(400).json({ error: 'There is already a user with that name.' })
                }
            }
            db('users')
                .insert(user)
                .then(insertResponse => {
                    const token = generateToken(user);
                    return res.status(201).json({ id: insertResponse[0], ...user, token });
                })
                .catch(err => res.status(500).json({ error: "Couldn't save the user to the database." }))
        })
        .catch(err => res.status(500).json({ error: "Couldn't retrieve the users information" }));
})

module.exports = router;