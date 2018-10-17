const router = require("express").Router();
const jsw = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../database/database");
const jscookies = require('js-cookie');

function generateJswTokenFor(user) {
  const payload = {
    ...user,
    class: "FSW13",
    role: ["admin", "root", "standard"]
  };
  const secret = "for the greater good";
  const options = {
    expiresIn: "1h"
  };
  return jsw.sign(payload, secret, options);
}

function protectedRoute(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res
      .status(401)
      .json({ message: "You are not authorized to view this information." });
  } else {
    if (token) {
      jsw.verify(token, "for the greater good", (err, decodedToken) => {
        if (err) {
          return res
            .status(401)
            .json({
              message: "You are not authorized to view this information."
            });
        } else {
          req.decodedToken = decodedToken;
          next();
        }
      });
    }
  }
}

function checkRole(role) {
  return (req, res, next) => {
    if (req.decodedToken && req.decodedToken.role.includes(role)) {
      next();
    } else {
      return res.status(403).json({ message: "Forbidden Access." });
    }
  };
}

router.post("/register", (req, res) => {
  let { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 12);
  password = hashedPassword;
  username = username.toLowerCase();
  db.insert({ username, password })
    .into("users")
    .then(count =>
      res.status(201).json({ count, message: "User successfully registerd" })
    )
    .catch(err =>
      res.status(500).json({ err, message: "Error registering user" })
    );
});

router.get("/users", protectedRoute, checkRole("standard"), (req, res) => {
  db("users")
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.status(500).json(err));
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  db("users")
    .where({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateJswTokenFor(user);
        res
          .status(200)
          .json({ message: "Successfully logged in.", token, user });
      } else {
        res.status(401).json({ message: "Invalid password or username" });
      }
    })
    .catch(err =>
      res.status(500).json({ err, message: "Server side error logging in." })
    );
});

router.post('/logout', (req, res) => {
  console.log(req.headers.authorization);
  if(!req.headers.authorization) {
    console.log(req.headers);
    return res.status(200).json({message: "Successfully Logged Out"});
  } else {
    console.log(req.headers);
    return res.status(500).json({message: "Server failed to log you out."});
  }
})

module.exports = router;
