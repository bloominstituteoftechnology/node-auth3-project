const express = require("express");
const helmet = require("helmet");
const knex = require("knex");
const bcrypt = require("bcryptjs");
const knexConfig = require("../knexfile.js");
const helpers = require("../helpers/helpers.js");

const server = express();
const db = knex(knexConfig.development);

server.use(helmet());
server.use(express.json());

server.get("/", (req, res) => {
  res.send("Test test 1 2 3");
});

//Register
server.post("/register", async (req, res) => {
    try {
        const userCredentials = req.body;
        const hash = bcrypt.hashSync(userCredentials.password, 12);
        userCredentials.password = hash;

        const newUser = await db("users").insert(userCredentials);
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ message: "Register failed. Please try again" });
    }
});

//Login
server.post("/login", async (req, res) => {
    try {
        const userCredentials = req.body;
        const userForCheck = await db("users")
        .where({ username: userCredentials.username })
        .first();

        if (
        userForCheck &&
        bcrypt.compareSync(userCredentials.password, userForCheck.password)
        ) {
        // login is successful
        // create the token
        const token = helpers.generateToken(userForCheck);

        res
            .status(200)
            .json({ message: `Welcome ${userForCheck.username}`, token });
        } else {
        res.status(401).json({
            message:
            "Your login attempt failed. Please check login and password and try again"
        });
        }
    } catch (err) {
        res.status(500).json({ message: "Your login attempt failed." });
    }
});

//Get list of users
// protect this endpoint so only logged in users can see it
server.get('/users', helpers.protected, async (req, res) => {
	const users = await db('users').select('id', 'username', 'department');

	res.status(200).json({users, decodedToken: req.decodedToken});
});

module.exports = server;
