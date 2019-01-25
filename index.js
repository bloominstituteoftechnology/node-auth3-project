const express = require("express");
const knex = require("knex");
const knexConfig = require("./knexfile.js");
const db = knex(knexConfig.development);
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const server = express();

server.use(express.json());
server.use(cors);

function generateToken(username) {
    const payload = {
        username: username
    };

    const secret = "reallysecuresecret";

    const options = {
        expiresIn: "12h",
        jwtid: "98765"
    };

    return jwt.sign(payload, secret, options);
}

server.post("/api/register", (req, res) => {
    if (req.body.username && req.body.password && typeof req.body.username === "string" && typeof req.body.password === "string") {
        let user = req.body;
        user.password = bcrypt.hashSync(user.password);
        db("users")
            .insert(user)
            .then(ids => {
                res.status(201).json(ids[0]);
            }).catch(error => {
                res.status(500).json({message: "Error registering user", error: error});
            });
    } else {
        res.status(400).json({ error: "Incorrectly formatted user data" });
    }
});

server.post("/api/login", (req, res) => {
    if (req.body.username && req.body.password && typeof req.body.username === "string" && typeof req.body.password === "string") {
        let user = req.body;
        db("users")
            .where("username", user.username)
            .then(dbUsers => {
                if (dbUsers.length 
                    && bcrypt.compareSync(user.password, dbUsers[0].password)) {
                        const token = generateToken(user.username);
                        res.status(200).json({ userId: dbUsers[0].id, token: token });
                    } else {
                        res.status(422).json({ error: "Incorrect username or password" })
                    }
            }).catch(error => {
                res.status(500).json({message: "Error logging in", error: error});
            });
    } else {
        res.status(400).json({ error: "Incorrectly formatted user data" });
    }
});

server.get("/api/users", (req, res) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, "reallysecuresecret", (error, decodedToken) => {
            if (error) {
                res.status(401).json({ message: "Invalid token", error: error });
            } else {
                console.log(decodedToken);
                db("users").then(dbUsers => {
                    res.status(200).json(dbUsers);
                }).catch(error => {
                    res.status(500).json({message: "Error getting users", error: error});
                });
            }
        });
    } else {
        res.status(401).json({message: "You must be logged in to access this page"});
    }
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});