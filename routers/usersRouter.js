const usersDb = require("../data/helpers/usersDb");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const express = require("express");
const router = express.Router();
const secret = "She-Ra";

const protect = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "You shall not pass!/Invalid token" });
      } else {
        next();
      }
    });
  } else {
    res.status(401).json({ message: "You shall not pass!/Missing token" });
  }
};

const generateToken = user => {
  const payload = {
    username: user.username,
    department: user.department
  };
  const options = {
    expiresIn: "1d",
    jwtid: `${user.id}`
  };
  return jwt.sign(payload, secret, options);
};

router.post("/register", (req, res) => {
  const user = req.body;

  if (
    !user.username ||
    typeof user.username !== "string" ||
    user.username === ""
  ) {
    res
      .status(400)
      .json({ error: "username must be included and must be a string" });
  } else if (
    !user.password ||
    typeof user.password !== "string" ||
    user.password === ""
  ) {
    res
      .status(400)
      .json({ error: "password must be included and must be a string" });
  } else if (
    !user.department ||
    typeof user.department !== "string" ||
    user.department === ""
  ) {
    res
      .status(400)
      .json({ error: "department must be included and must be a string" });
  } else {
    user.password = bcrypt.hashSync(user.password, 14);
    usersDb
      .insert(user)
      .then(id => {
        const token = generateToken(user);
        res.status(200).json({ id: id, token });
      })
      .catch(err => res.status(500).json({ error: err }));
  }
});

router.post("/login", (req, res) => {
  const user = req.body;
  if (
    !user.username ||
    typeof user.username !== "string" ||
    user.username === ""
  ) {
    res
      .status(400)
      .json({ error: "username must be included and must be a string" });
  } else if (
    !user.password ||
    typeof user.password !== "string" ||
    user.password === ""
  ) {
    res
      .status(400)
      .json({ error: "password must be included and must be a string" });
  } else {
    usersDb
      .get(user.username)
      .then(users => {
        if (users[0] && bcrypt.compareSync(user.password, users[0].password)) {
          usersDb
          const token = generateToken(users[0]);
          res.status(200).json({ message: "Logged In", token });
        } else {
          res.status(404).json({ message: "You shall not pass!" });
        }
      })
      .catch(err => {
        res.status(500).json({ error: "trouble logging in" });
      });
  }
});

router.get("/users", protect, (req, res) => {
  usersDb
    .get()
    .then(users => {
      res.send(users);
    })
    .catch(err => {
      res.status(500).json({ message: "trouble getting users" });
    });
});

router.get("/users/:id", protect, (req, res) => {
  const { id } = req.params;
  usersDb
    .get(id)
    .then(users => {
      res.send(users[0]);
    })
    .catch(err => {
      res.status(500).json({ message: "trouble getting user" });
    });
});

router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      res.status(500).send('failed to logout');
    } else {
      res.send('logout successful');
    }
  });
});


router.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  const deleted = await usersDb.get(id);

  usersDb
    .get(id)
    .then(user => {
      if (user) {
        usersDb
          .delete(id)
          .then(rows => res.status(201).json(deleted))
          .catch(err =>
            res.status(500).json({ error: "trouble deleting user" })
          );
      } else {
        res.status(404).json({ error: "user does not exist" });
      }
    })
    .catch(err =>
      res.status(500).json({ error: "trouble retrieving user to be deleted" })
    );
});

module.exports = {
  router,
  secret
};
