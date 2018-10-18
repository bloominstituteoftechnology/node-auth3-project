const express = require("express");
const db = require("./userInfoModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

const jwtSecret = "nobody tosses a dwarf!";

function generateToken(user) {
  const jwtPayload = {
    sub: user.id
  };
  const jwtOptions = {
    expiresIn: "1h"
  };

  return jwt.sign(jwtPayload, jwtSecret, jwtOptions);
}

router.get("/users", protected ,(req, res) => {
    db.getAllUsernames().then(users => {
        res.json(users)
    })
});

router.post("/register", (req, res) => {
  const cred = req.body;
  cred.password = bcrypt.hashSync(cred.password, 14);
  db.addUser(cred).then(table => {
    db.getUserByUsername(cred.username).then(user => {
      const token = generateToken(user); 
      res.status(200).json({ welcome: user.username, token });
    })
  });
});

router.post("/login", (req, res) => {
  const cred = req.body;
  db.getUserByUsername(cred.username).then(user => {
    if (user && bcrypt.compareSync(cred.password, user.password)) {
      const token = generateToken(user); 
      res.status(200).json({ welcome: user.username, token });
    } else {
      res.status(401).json({ message: "nope" });
    }
  });
});
function protected(req, res, next) {
    console.log(req.headers) 
    const token = req.headers.loggedin;
    if (token) {
      jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err) {
          res.status(401).json({ message: 'invalid token' });
        } else {
          req.decodedToken = decodedToken;          
          next();
        }
      });
    } else {
      res.status(401).json({ message: 'no token provided' });
    }
  }

module.exports = router;
