const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const dbConfig = require("./knexfile");
const server = express();
const knex = require("knex");
const db = knex(dbConfig.development);
const PORT = 3300;

server.use(express.json());
server.use(cors());

const secret = "secret phrase";

const generateToken = user => {
  const payload = {
    username: user.username
  };
  const options = {
    expiresIn: "1h",
    jwtid: "12345"
  };
  return jwt.sign(payload, secret, options);
};

const protect = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Invalid token" });
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.status(401).json({ message: "No token provided." });
  }
};
//create user, hash password
server.post("/api/register", (req, res) => {
  const credentials = req.body;
  credentials.password = bcrypt.hashSync(credentials.password, 10);
  db("users")
    .insert(credentials)
    .then(ids => {
      const id = ids[0];
      db("users")
        .where({ id })
        .first()
        .then(user => {
          const token = generateToken(user);
          res.status(201).json({ id: user.id, token });
        })
        .catch(err => {
          res.status(500).send(err);
        });
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

//use credentials in body, create new JWT upon successful login
server.post("/api/login", (req, res) => {
  const credentials = req.body;
  db("users")
    .where({ username: credentials.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(credentials.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ token });
        res.send(`Welcome ${user.username}!`);
      } else {
        res.status(401).json({ message: "You shall not pass!" });
      }
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

//if logged in, return array of users. verify that password is hashed before save
server.get("/api/users", protect, (req, res) => {
  db("users")
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.send(err);
    });
});

server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
