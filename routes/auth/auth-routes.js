const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/users-model');

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 7);

    user.password = hash;

    Users.add(user)
         .then(id => {
             res.status(201).json({ status: 201, message: success });
         })
         .catch(err => {
             res.status(500).json({ error: err, message: 'Registration Failed' });
         });
});

module.exports = router;