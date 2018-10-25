const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./database/dbConfig.js');

const server = express();
server.use(express.json()); // server will be stateless
server.use(helmet());
server.use(cors());

// Sanity Check
server.get('/', (req, res) => {
	res.send('Do You See Me!');
});

server.post('/register', (req, res) => {
	const creds = req.body;

	const hash = bcrypt.hashSync(creds.password, 10);
	creds.password = hash;

	db('users')
		.insert(creds)
		.then((ids) => {
			const id = ids[0];
			res.status(201).json({ newUserId: id });
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

const jwtSecret = 'Tokyo Ghoul Kaneki Is My Hero';

// Function to generate a user token
function generateToken(user) {
	const jwtPayload = {
		...user,
		hello: 'FSW13',
		roles: ['admin', 'root'],
	};
	const jwtOptions = {
		expiresIn: '1m',
	};

	return jwt.sign(jwtPayload, jwtSecret, jwtOptions);
}

server.post('/login', (req, res) => {
	const creds = req.body;

	db('users')
		.where({ username: creds.username })
		.first()
		.then((user) => {
			if (user && bcrypt.compareSync(creds.password, user.password)) {
				const token = generateToken(user); // generate a token for a user
				res.status(200).json({ welcome: user.username, token });
			} else {
				res.status(401).json({ message: 'you shall not pass!' });
			}
		})
		.catch((err) => {
			res.status(500).json({ err });
		});
});

// Authenticated users
server.get('/users', protected, checkRole('admin'), (req, res) => {
	db('users')
		.select('id', 'username', 'password', 'department')
		.then((users) => {
			res.json({ users });
		})
		.catch((err) => res.send(err));
});

function protected(req, res, next) {
	// Authentication tokens are normally sent as a header instead of the body
	const token = req.headers.authorization;
	if (token) {
		jwt.verify(token, jwtSecret, (err, decodedToken) => {
			if (err) {
				// Token Verification Failed
				res.status(401).json({ message: 'invalid token' });
			} else {
				// Valid Token
				req.decodedToken = decodedToken;
				console.log('\n** decoded token information **\n', req.decodedToken);
				next();
			}
		});
	} else {
		res.status(401).json({ message: 'no token provided' });
	}
}

function checkRole(role) {
	return function(req, res, next) {
		if (req.decodedToken && req.decodedToken.roles.includes(role)) {
			next();
		} else {
			res.status(403).json({ message: 'You Shall Not Pass! - FORBIDDEN' });
		}
	};
}

// Server Listening
const port = 9900;
server.listen(port, () => console.log(`\nAPI running on port ${port}\n`));
