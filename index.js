const cors = require("cors");
const bcrypt = require("bcryptjs");
const helmet = require("helmet");
const express = require("express");
const knex = require("knex");
const knexConfig = require("./knexfile.js");
const server = express();
const jwt = require("jsonwebtoken");

const db = knex(knexConfig.development);

server.use(helmet());
server.use(express.json());
server.use(cors());
const jwtSecret = "dontforgettolikeandsubscribe";
function generateToken(user) {
	const payload = {
		...user.username,
		hello: "Welcome",
		department: "IT"
	};

	const JwtOptions = {
		expiresIn: "10m"
	};

	return jwt.sign(payload, jwtSecret, JwtOptions);
}

server.post("/api/register", (req, res) => {
	const credentials = req.body;
	const hash = bcrypt.hashSync(credentials.password, 15);
	credentials.password = hash;

	db("users")
		.insert(credentials)
		.then(ids => {
			res.status(201).json({ id: ids[0] });
		})
		.catch(err => {
			res.status(500).json({ error: "could not create user" });
		});
});

server.post("/api/login", (req, res) => {
	const creds = req.body;
	db("users")
		.where({ username: creds.username })
		.first()
		.then(user => {
			if (user && bcrypt.compareSync(creds.password, user.password)) {
				const token = generateToken(user);
				res.status(201).json({ welcome: user.username, token });
			} else {
				res
					.status(500)
					.json({ error: "Wrong Username and/or Password, please try again" });
			}
		});
});

server.get("/api/users", protected, checkRole("IT"), (req, res) => {
	db("users")
		.select("id", "username", "password")
		.then(users => {
			res.json(users);
		})
		.catch(err => res.send(err));
});

function protected(req, res, next) {
	const token = req.headers.authorization;
	jwt.verify(token, jwtSecret, (err, decodedToken) => {
		if (err) {
			res.status(401).json({ message: "Invalid Token" });
		} else {
			req.decodedToken = decodedToken;
			next();
		}
	});

	if (token) {
	} else {
		res.status(401).json({ message: "No token provided" });
	}
}

function checkRole(department) {
	return function(req, res, next) {
		if (req.decodedToken && req.decodedToken.department === department) {
			next();
		} else {
			res.status(403).json({ message: "you shall not pass" });
		}
	};
}

server.listen(3300, () => console.log("\nrunning on port 3300\n"));
