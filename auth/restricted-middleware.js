const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");

const Users = require("../users/usersModel");

const restricted = (req, res, next) => {
  // const { username, password } = req.body;

  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secrets.jwtSecrets, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "there was a problem" });
      } else {
        req.decodedJwt = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "there was a problem with the token" });
  }

  // Users.findBy({ username })
  //   .first()
  //   .then(user => {
  //     if (user && bcrypt.compareSync(password, user.password)) {
  //       const token = generateToken(user);
  //       res
  //         .status(200)
  //         .json({ message: `Welcome ${user.username}`, token: token });
  //     } else {
  //       res.status(401).json({ message: "Invalid credentials" });
  //     }
  //   })
  //   .catch(err => res.status(500).json({ message: "Could not login" }));
};

module.exports = restricted;
