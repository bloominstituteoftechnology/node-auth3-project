const router = require('express').Router();
const Users = require('./usersModel.js');
const bcrypt = require('bcryptjs');

// REGISTER A USER
router.post('/register', async (req, res) => {
    const user = req.body;
    if (!user.username && !user.password && !user.department) return res.status(401).json({ message: "Provide a username, password, and department." });
    user.password = bcrypt.hashSync(user.password);
    try {
        const _user = await Users.insert(user);
        res.status(201).json(_user);
    } catch(error) {
        res.status(400).json({ message: "This user already exists.", error });
    }
});

// USER LOGIN
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const _user = await Users.findBy({ username });
        if (_user && bcrypt.compareSync(password, _user.password)) {
            const user = {
                id: _user.id,
                username: _user.username,
                department: _user.department,
                token: 'mytoken'
            }
            res.status(200).json(user);
        } else {
            res.status(401).json({ message: "You shall not pass!" });
        }
    } catch(error) {
        res.status(401).json({ message: "You shall not pass!" });
    }
});

module.exports = router;