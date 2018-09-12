const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("./data/dbConfig.js");

const server = express();

server.use(express.json());
server.use(cors());

// function protected(req, res, next) {
//     if (req.session && req.session.username) {
//       next();
//     } else {
//       res.status(401).json({ message: "You shall not pass!!" });
//     }
//   }

// server.use("/api/restricted", protected);

server.get("/", (req, res) => {
  res.send("This is working...");
});

function generateToken(user) {
  const payload = {
    username: user.username
  };

  const secret = "random";

  const options = {
    expiresIn: "1h",
    jwtid: "12345",
    subject: `${user.id}`
  };

  return jwt.sign(payload, secret, options);
}

server.post("/api/register", (req, res) => {
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 10);
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
        .catch(err => res.status(500).send(err));
    })
    .catch(err => res.status(500).send(err));
});

server.post("/api/login", (req, res) => {
  const creds = req.body;

  db("users")
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);
        res.status(200).send({ token });
      } else {
        res.status(401).json({ message: "You shall not pass!" });
      }
    })
    .catch(err => res.status(500).send(err));
});

// server.get("/api/restricted/logout", (req, res) => {
//     if (req.session) {
//       req.session.destroy(err => {
//         if (err) {
//           res.send("Error logging out");
//         } else {
//           res.send("Goodbye...");
//         }
//       });
//     }
//   });

server.get("/api/users", (req, res) => {
  db("users")
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

server.listen(8000, () => console.log("\nrunning on port 8000\n"));
