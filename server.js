require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs'); // *************************** added package and required it here
const jwt = require('jsonwebtoken');
const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());
server.use(cors());

// creating a token that sends payload of information to keep in the client
const generateToken = (user) => {
	const payload = {
		// ...user,
		userId: user.id,
		username: user.username,
		roles: user.department // this will come from the database
	};
	const secret = process.env.JWT_SECRET;
	const options = {
		expiresIn: '1h'
	};
	return jwt.sign(payload, secret, options);
};

server.post('/api/login', (req, res) => {
	// grab username and password from body
	const creds = req.body;

	db('users')
		.where({ username: creds.username })
		.first()
		.then((user) => {
			if (user && bcrypt.compareSync(creds.password, user.password)) {
				// passwords match and user exists by that username
				// created a session > create a token
				// library sent cookie automatically > we send the token manually
				// the data for the token has to be inside of the payload property
				const token = generateToken(user);
				res.status(200).json({ message: 'welcome!', token });
			} else {
				// either username is invalid or password is wrong
				res.status(401).json({ message: 'you shall not pass!!' });
			}
		})
		.catch((err) => res.json(err));
});

const protected = (req, res, next) => {
	// token is normally sent in the authorization header
	const token = req.headers.authorization;

	if (token) {
		// is it valid?
		//veruft takes in a token, a secret and function to validate
		jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
			if (err) {
				// token is invalid
				res.status(401).json({ message: 'invalid token' });
			} else {
				// token is valid
				req.decodedToken = decodedToken;
				next();
			}
		});
	} else {
		// bounce
		res.status(401).json({ message: 'no token provided' });
	}
};

// protect this route, only authenticated users should see it
server.get('/api/me', protected, (req, res) => {
	db('users')
		.select('id', 'username', 'password') // ***************************** added password to the select
		.where({ id: req.session.user })
		.first()
		.then((users) => {
			res.json(users);
		})
		.catch((err) => res.send(err));
});

/////////// gets all user information
server.get('/api/users', protected, checkRole('Supervisor'), (req, res) => {
	db('users')
		.select('id', 'username', 'password', 'department') // ***************************** added password to the select
		.then((users) => {
			res.json(users);
		})
		.catch((err) => res.send(err));
});

function checkRole(role) {
	return function(req, res, next) {
		if (req.decodedToken && req.decodedToken.roles.includes(role)) {
			next();
		} else {
			res.status(403).json({ message: 'Access denied' });
		}
	};
}

server.post('/api/register', (req, res) => {
	// grab username and password from body
	const creds = req.body;
	// generate the hash from the user's password
	const hash = bcrypt.hashSync(creds.password, 14); // rounds is 2^X
	// override the user.password with the hash
	creds.password = hash;
	// save the user to the database
	db('users')
		.insert(creds)
		.then((ids) => {
			res.status(201).json(ids);
		})
		.catch((err) => json(err));
});

server.get('/', (req, res) => {
	res.send('Its Alive!');
});

server.listen(9000, () => console.log('this port is over 9000!!!'));
