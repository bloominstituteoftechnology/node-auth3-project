const express = require('express');
const userDb = require('../data/models/userDb.js');

const router = express.Router();

router.get('/', (req, res) => {
	return userDb
		.getAllUsers()
		.then(users => {
			if (users.length) {
				return res.status(200).json(users);
			}
			return res.status(404).json({ message: 'Users is empty. Create a new user first.' });
		})
		.catch(err => res.status(500).json({ error: `Server failed to GET all users: ${ err }` }));
});

module.exports = router;
