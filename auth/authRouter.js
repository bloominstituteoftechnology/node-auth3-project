const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");

const Users = require("../users/usersModel");

router.post("/register", (req, res) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;

  if (!user.username || !user.password) {
    res.status(401).json({ message: "Please add a username and password" });
  } else {
    Users.add(user)
      .then(user => res.status(201).json(user))
      .catch(err =>
        res.status(500).json({ message: "Could not create a new user" })
      );
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res
          .status(200)
          .json({ message: `Welcome ${user.username}`, token: token });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    })
    .catch(err => res.status(500).json({ message: "Could not login" }));
});

const generateToken = user => {
  const payload = {
    userid: user.id,
    username: user.username
  };

  const options = {
    expiresIn: "8h"
  };

  const token = jwt.sign(payload, secrets.jwtSecrets, options);

  return token;
};

module.exports = router;
