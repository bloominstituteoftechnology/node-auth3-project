const cors = require("cors");
const bcrypt = require("bcryptjs");
const helmet = require("helmet");
const knex = require("knex");
const knexConfig = require("./knexfile.js");
const server = express();
const jwt = require("jsonwebtoken");
const express = require("express");

const db = knex(knexConfig.development);

server.use(helmet());
server.use(express.json());
server.use(cors());

function generateToken(user) {
	const payload = {
		...user.username,
		hello: "Welcome",
		role: "admin"
	};

	const jwtsubscribe = "dont forget to subscribe";
  const JwtOptions = {
  expiresIn: "10m"
};


	return jwt.sign(payload, jwtsubscribe, JwtOptions);
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
			res.status(500).json({ error: "Create failed" });
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
					.json({ error: "Incorrect login" });
			}
		});
});

server.get("/api/users", (req, res) => {
	db("users")
		.select("id", "username", "password")
		.then(users => {
			res.json(users);
		})
		.catch(err => res.send(err));
});
const port = 8000;
server.listen(3300, () => console.log("\nProject rolling on port 8000\n"));
