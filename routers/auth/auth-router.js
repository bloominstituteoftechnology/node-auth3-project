const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Users = require("./auth-model");
const generateToken = require('../../api/token')

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      const token = generateToken(user);
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({
          mess: `welcome ${user.username}`,
          token,
        });
      } else {
        res.status(401).json({ mess: "invalid creds" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
