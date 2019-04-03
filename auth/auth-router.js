const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secret = require("../api/secrets").jwtSecret;
const Users = require("../users/users-model.js");

//----- Post for /api/register-----//

// for endpoints beginning with /api/auth
router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

//------ Post Router for Login-----//
router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

//------ Generate Token Function------//
function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    department: ["instructors", "project managers", "students"]
  };
  const options = {
    expiresIn: "1d"
  };
  return jwt.sign(payload, secret, options);
}
module.exports = router;
