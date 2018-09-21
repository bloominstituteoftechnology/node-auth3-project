const express = require("express");
const server = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("./dbconfig.js");
const cors = require ('cors');
const corsOptions = {origin: "http://localhost:3000"}
server.use(express.json());
server.use(cors(corsOptions))
const secret = "welcome to goodburger";
function generateToken(user) {
  const payload = {
    username: user.username
  };
  const options = {
    expiresIn: "1h",
    jwtid: "12345"
  };
  return jwt.sign(payload, secret, options);
}

function restricted(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "token invalid" });
      } else {
        req.user = { username: decodedToken.username };
        next();
      }
    });
  } else {
    res.status(401).json({ message: "no token" });
  }
}

server.get("/", (req, res) => {
  res.send("Uh, this page is empty!");
});

server.post("/register", (req, res) => {
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 3);
  creds.password = hash;
  db("users")
    .insert(creds)
    .then(ids => {
      const id = ids[0];
      db("users")
        .where({ id })
        .first()
        .then(user => {
          const token = generateToken(user);
          res.status(201).json({ id: user.id, token });
        })
        .catch(err => res.status(500).send(err))
        .catch(err => {
          console.log("/login POST error:", err);
          res.status(500).send("Unable to login. Please try again later");
        });
    })

    .catch(err => {
      console.log("/login POST error:", err);
      res.status(500).send("Unable to login. Please try again later");
    });
});

server.get("/users", restricted, (req, res) => {
  db("users")
    .select("id", "username", "department")
    .then(users => {
      res.json(users);
    })

    .catch(err => {
      console.log("/login POST error:", err);
      res.status(500).send("Unable to login. Please try again later");
    });
});

server.post("/login", (req, res) => {
  const creds = req.body;
  db("users")
    .where("username", creds.username)
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: "login invalid" });
      }
    })
    .catch(err => {
      console.log("/login POST error:", err);
      res.status(500).send("Unable to login. Please try again later");
    });
});

const port = 4000;

server.listen(port, () => console.log(`Listening on port ${port}`));
