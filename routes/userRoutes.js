const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("../database/dbConfig");
const secret = "some lotr q";

function genToken(user) {
  const payload = {
    username: user.username,
    department: user.department
  };
  const options = {
    expiresIn: "1h"
  };
  return jwt.sign(payload, secret, options);
}

function protected(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      console.log(decodedToken);
      if (err) {
        return res.status(401).json({ message: "You shall not pass!" });
      } else {
        req.username = decodedToken.username;
        req.department = decodedToken.department;
        next();
      }
    });
  } else {
    return res.status(401).json({ message: "You shall not pass!" });
  }
}

// router.get("/", (req, res) => {
//   res.send("router working");
// });

router.post("/register", (req, res) => {
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 10);
  creds.password = hash;

  db("users")
    .insert(creds)
    .then(ids => {
      const id = ids[0];
      // console.log(id)
      db("users")
        .where({ id })
        .first()
        .then(user => {
          const token = genToken(user);
          res.status(201).json({ token });
        })
        .catch(err => res.status(500).json({ errorToken: err }));
    })
    .catch(err => res.status(500).json({ errorRegister: err }));
});

router.post("/login", (req, res) => {
  const creds = req.body;
  db("users")
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = genToken(user);
        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: "You shall not pass!" });
      }
    })
    .catch(err => res.status(500).json({ errorLogin: err }));
});

router.get("/", protected, (req, res) => {
  db("users")
    .select("id", "username", "department")
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.status(500).json({ message: "You shall not pass! " }));
});

module.exports = router;
