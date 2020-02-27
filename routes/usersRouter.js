const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

const Users = require("../data/helpers/dbModel.js");
const { restricted } = require("../middleware/middleware.js");

// GENERATE TOKEN
const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user.id
    },
    process.env.JWT_SECRET,
    { expiresIn: "20s" }
  );
};

// POST "/api/register"
router.post("/register", (req, res) => {
  Users.add(req.body)
    .then((user) => {
      const token = generateToken(user);

      res
        .status(201)
        .json({ message: `Welcome ${user.username}!`, authToken: token });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST "/api/login"
router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.json({ message: `Welcome ${user.username}!`, authToken: token });
      } else {
        res.status(401).json({ message: "You shall not pass!" });
      }
    })
    .catch((err) => res.status(500).json(err));
});

// GET "/api/users"
router.get("/users", restricted, (req, res) => {
  Users.find()
    .then((users) => {
      res.json(
        users.map((user) => {
          return { id: user.id, username: user.username };
        })
      );
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
