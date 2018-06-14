const router = require("express").Router();
const jwt = require("jsonwebtoken");

const User = require("./User");

const secret = require("../secret.js");

function restricted(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: "Please login!" });
      } else {
        req.jwtPayload = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "Please login!" });
  }
}

router.get("/", restricted, (req, res) => {
  User.find()
    .select("-password")
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
