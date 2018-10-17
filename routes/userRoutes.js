const express	= require('express');
const bcrypt	= require('bcryptjs');
const jwt		= require('jsonwebtoken');
const userDb	= require('../data/models/userDb.js');

const router	= express.Router();

const jwtSecret = 'this-is.a-secret!';
const generateJwtToken = user => {
	const jwtPayload = {
		userId: user.id,
		username: user.username,
		department: user.department,
	};
	const jwtOptions = {
		expiresIn: 1000 * 60 * 5, // 5 mins
	};
	return jwt.sign(jwtPayload, jwtSecret, jwtOptions);
};

// middleware
function checkLogin(req, res, next) {
	const token = req.headers.authorization;
	if (token) {
		return jwt.verify(token, jwtSecret, (err, decodedToken) => {
			if (err) return res.status(401).json({ error: 'You shall not pass!' });
			req.decodedToken = decodedToken;
			return next();
		});
	}
	return res.status(401).json({ error: 'You shall not pass!' });
};

// get list of all users within department of logged in user
router.get('/', checkLogin, (req, res) => {
	const { department } = req.decodedToken;
	return userDb
		.getAllUsers(department)
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
					// has the password first
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

// login a user
router.post('/login', (req, res) => {
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
			// if user exists in the db, you may log in
			if (user) {
				return bcrypt
					.compare(credentials.password, user.password)
					.then((match) => {
						if (match) {
							const jwtToken = generateJwtToken(user);
							return res.status(201).json({
								username: credentials.username,
								department: user.department,
								jwtToken: jwtToken,
							});
						}
						return res.status(401).json({ error: 'You shall not pass!' });
					});
			}
			return res.status(401).json({ error: 'You shall not pass!' });
		})
		.catch(err => res.status(500).json({ error: `Server failed to POST login for a user: ${ err }` }));
});

module.exports = router;
