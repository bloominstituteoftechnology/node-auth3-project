const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("./User");

const secret = "its a secret"

function restricted(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      
      if (err) {
        return res.status(401).json({ message: "No Entry, your decoder ring is incorrect" });
      }
      next();
    });
  } else {
    res
      .status(401)
      .json({
        message:
          "You have no token sir! Kindly remove yourself from the premises!"
      });
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
