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

module.exports = router;