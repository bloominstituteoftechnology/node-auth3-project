const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../secrets.js");
const Users = require("../users/user-model.js");

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;
  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;
  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user)
        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: "You shall not pass." });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "There was a problem logging user in." });
    });
});

function generateToken(user) {
  const payload = {
    sub: user.id,
    username: user.username
  };

  const options = {
    expiresIn: "1d"
  };
  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
