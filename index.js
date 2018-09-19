const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("./database/dbConfig.js");

const server = express();

server.use(express.json());
server.use(cors());

// generate json web token
function generateToken(user) {
  const payload = {
    username: user.username,
    department: user.department
  };

  const secret = "uzi";

  const options = {
    expiresIn: "1h",
    jwtid: "12345" // jti is the token id
  };

  return jwt.sign(payload, secret, options);
}

// global middleware to restrict routes to logged in users only
function protect(req, res, next) {
  // use jwt instead of sessions here
  next();
}

// register
server.post("/api/register", (req, res) => {
  // grab the credentials
  const creds = req.body;
  //hash the password
  const hash = bcrypt.hashSync(creds.password, 3);
  //replace the user passsword with the hash
  creds.password = hash;
  // save the user
  db("users")
    .insert(creds)
    .then(ids => {
      const id = ids[0];
      // we need to find the user by id
      db("users")
        .where({ id })
        .first()
        .then(user => {
          // generate a token
          const token = generateToken(user);
          //attach that token to the response
          res.status(201).json({ id: user.id, token });
        })
        .catch(err => res.status(500).send(err));
    })
    .catch(err => res.status(500).send(err));
});
// end register

// login
server.post("/api/login", (req, res) => {
  // grad creds
  const creds = req.body;
  // find the user
  db("users")
    .where({ username: creds.username })
    .first()
    .then(user => {
      // check creds
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        // generate a token

        //attach that token to the response
        res.status(200).send(`Welcome ${user.username}`);
      } else {
        res.status(401).json({ message: "You shall not pass!" });
      }
    })
    .catch(err => res.status(500).send(err));
});
// end login

// protect this route, only authenticated users should see it
server.get("/api/users", protect, (req, res) => {
  db("users")
    .select("id", "username", "password", "department")
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

server.get("/", (req, res) => {
  res.send("Server is humming along nicely.");
});

server.listen(3300, () => console.log("\nrunning on port 3300\n"));
