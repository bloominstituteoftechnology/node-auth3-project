// imports
const express = require("express");
const bcrpyt = require("bcryptjs");

// instantiate server
const server = express();
server.use(express.json());

// middleware
// jwt
// generate token
const generateToken = user => {
  const jwtPayload = {
    ...user,
    hello: "FSW13",
    role: "admin"
  };
  const jwtSecret = "nobody tosses a dwarf";
  const jwtOptions = {
    expiresIn: "1m"
  };

  return jwt.sign(jwtPayload, jwtSecret, jwtOptions);
};

// endpoints
server.post("/api/register", (req, res) => {
  const creds = req.body;
  //hash
  bcrpyt.hsashSync(creds.password, 10);
  creds.password = hash;
  db("users")
    .insert(creds)
    .then(ids => res.status(201).json(ids[0]))
    .catch(err => res.status(500).json(err));
});

server.post("/api/login", (req, res) => {
  const creds = req.body;
  db("users")
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        // create token{}
        const token = generateToken(user);
        res.status(200).json({ welcome: user.username, token });
      } else {
        res.status(401).json({ message: "You shall not pass!" });
      }
    });
});

server.get("/api/users", protected, (req, res) => {
  db("users")
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json(err));
});

// server port
server.listen(9000, () => {
  console.log("Server is running on port 9000");
});

// knex
const knex = require("knex");
const knexConfig = require("./knexfile");
const db = knex(knexConfig.development);
