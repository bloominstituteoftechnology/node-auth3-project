// DEPENDENCIES
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// DATA HELPERS
const model = require('./data/helpers/model');

// SERVER
const server = express();

// MIDDLEWARE
const configureMiddleware = require('./middleware/middleware');

configureMiddleware(server);

// jwt stuff
const jwtSecret = "I'm a secret! Shhh!";

function generateToken(user) {
	const jwtPayload = { user: user.id };
	const jwtOptions = {
		expiresIn: '1m' // 1 minute for testing purposes
	};

	return jwt.sign(jwtPayload, jwtSecret, jwtOptions);
}

// Auth check
const restricted = (req, res, next) => {
	const token = req.headers.authorization;
	console.log({ token });
	if (token) {
		jwt.verify(token, jwtSecret, (err, decodedToken) => {
			if (err) {
				res.status(401).json({ message: 'Invalid token' });
			} else {
				req.decodedToken = decodedToken;
				next();
			}
		});
	} else {
		res.status(401).json({ message: 'No token provided' });
	}
};

// ROUTES
// register
server.post('/api/register', (req, res) => {
	const { username, password, department } = req.body;
	const credentials = { username, password, department };

	const hash = bcrypt.hashSync(credentials.password, 12);
	credentials.password = hash;

	model
		.addUser(credentials)
		.then(user => {
			const token = generateToken(user);
			res
				.status(200)
				.json({ success: `User ${credentials.username} logged in`, token });
		})
		.catch(err => {
			if (err.code === 'SQLITE_CONSTRAINT') {
				return res.status(409).json({ error: 'Duplicate username' });
			} else {
				return res.status(500).json(err);
			}
		});
});

// login
server.post('/api/login', (req, res) => {
	const credentials = req.body;

	model
		.login(credentials)
		.then(user => {
			if (user) {
				const token = generateToken(user);
				res
					.status(200)
					.json({ success: `User ${credentials.name} logged in`, token });
			} else {
				res.status(401).json({ error: 'You shall not pass!' });
			}
		})
		.catch(err => res.status(500).json(err));
});

// get users (must be logged in)
server.get('/api/users', restricted, (req, res) => {
	model
		.getUsers()
		.then(users => {
			res.status(201).json(users);
		})
		.catch(err => res.status(500).json(err));
});

// PORT
const port = 5000;
server.listen(port, () => {
	console.log(`\n=== Listening on http://localhost:${port} ===\n`);
});
