const express = require("express");
const cors = require("cors");

const db = require("./data/db");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const server = express();

server.use(express.json());
server.use(cors({ origin: "http://localhost:3000", credentials: true }));

server.get("/api", (req, res) => {
  res.send("working...");
});

server.post("/api/register", (req, res) => {
  const user = req.body;
  // hash password
  const hash = bcrypt.hashSync(user.password, 14);
  user.password = hash;
  db("users")
    .insert(user)
    .then(ids => {
      db("users")
        .where({ id: ids[0] })
        .first()
        .then(user => {
          const token = generateToken(user); //generate toekn
          res.status(201).json(token); // attach token to response
        });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

const secret = "nobody tosses a dwarf";
function generateToken(user) {
  const payload = {
    username: user.username
  };
  const options = {
    expiresIn: "1h",
    jwtid: "8728391"
  };
  return jwt.sign(payload, secret, options);
}
function protected(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        return res
          .status(401)
          .json({ err: "You Shall not Pass!! - token invalid" });
      }
      req.jwtToken = decodedToken;
      next();
    });
  } else {
    return res.status(401).json({ error: "You shall not pass!! - no token" });
  }
}

server.post("/api/login", (req, res) => {
  const credentials = req.body;
  db("users")
    .where({
      username: credentials.username
      //   departments: credentials.departments
    })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(credentials.password, user.password)) {
        const token = generateToken(user); // generate token
        res.send(token); // attach toekn to the response
      } else {
        return res.status(401).json({ error: "Incorrect credentials" });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "errorrrrrr" });
    });
});

server.get("/api/users", protected, (req, res) => {
  db("users")
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

const port = 8000;
server.listen(port, () => {
  console.log(`Web API listening on http://localhost:${port}`);
});
