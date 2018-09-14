const express = require("express");
const router = express.Router();
const db = require("../dbConfig");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const SALT_ROUNDS = 12;

function generateToken(payload) {
	return jwt.sign(payload, process.env.SECRET || "secret", {
		expiresIn: "1h",
	});
}

router.post("/register", function(req, res, next) {
	console.log(req.body);
	let { username, password, department } = req.body;

	if (!username || !password || !department)
		return res.json({
			error: true,
			message: "Please provide a Username, Password and Department",
		});

	password = bcrypt.hashSync(password, SALT_ROUNDS);

	db("users")
		.insert({ username, password, department })
		.then(([id]) => {
			let token = generateToken({ id });
			res.json({
				error: false,
				message: "User created succesfully",
				token,
			});
		})
		.catch(next);
});

router.post("/login", function(req, res, next) {
	let { username, password } = req.body;

	if (!username || !password)
		return res.json({
			error: true,
			message: "Please provide a Username and Password",
		});

	db("users")
		.where({ username: username })
		.first()
		.then(user => {
			console.log(user);
			if (user && bcrypt.compareSync(password, user.password)) {
				let token = generateToken(user);

				res.json({
					error: false,
					message: `Welcome ${username}`,
					token,
				});
			} else {
				return res.json({
					error: true,
					message: "Invalid Login Info",
				});
			}
		})
		.catch(next);
});

module.exports = router;
