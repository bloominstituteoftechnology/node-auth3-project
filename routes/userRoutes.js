const express = require('express');
const bcrypt = require('bcryptjs');
const userDb = require('../data/models/userDb.js');

const router = express.Router();

// get list of all users
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

// create new user and return ID of newly created user
router.post('/register', (req, res) => {
	const credentials = req.body;
	if (!credentials.username) {
		return res.status(401).json({ error: 'Username cannot be empty.' });
	}
	if (!credentials.password) {
		return res.status(401).json({ error: 'Password cannot be empty.' });
	}
	return userDb
		.getUser(credentials.username)
		.then(user => {
			// if username does not exist, you may register it
			if (!user.length) {
				return bcrypt
					.hash(credentials.password, 12, function(bcryptErr, hash) {
						if (bcryptErr) {
							return res.status(500).json({ error: `Bcrypt hashing failed: ${ bcryptErr }` });
						}
						credentials.password = hash;
						return userDb
							.insertNewUser(credentials)
							.then(id => res.status(201).json(id.id[0]))
							.catch(err => res.status(500).json({ error: `Server failed to POST new user: ${ err }` }));
					});
			}
			// if username already exists, send error message
			return res.status(403).json({ error: `Username ${ credentials.username } already exists. Please register with a new username.` });
		})
		.catch(err => res.status(500).json({ error: `Server failed to GET user: ${ err }` }));
});

module.exports = router;
