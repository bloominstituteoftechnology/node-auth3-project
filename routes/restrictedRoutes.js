const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../dbConfig");

const secret = "secret";

function protected(req, res, next) {
	const token = req.headers.authorization;

	if (token) {
		jwt.verify(token, secret, (err, decodedToekn) => {
			if (err) {
				return res.json({
					error: true,
					message: "You are not authorized to see this data",
				});
			} else {
				req.user = { username: decodedToekn.username };
				next();
			}
		});
	} else {
		return res.json({
			error: true,
			message: "No token provided",
		});
	}
}

router.get("/users", protected, function(req, res, next) {
	db("users")
		.select("id", "username", "password")
		.then(users => {
			res.json(users);
		})
		.catch(err => res.send(err));
});

module.exports = router;
