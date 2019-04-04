require("dotenv").config(); //reads from the .env file and places them below //add .env file to gitignore
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mwConfig = require("./api/server.js");
const db = require("./data/dbConfig.js");

const { authenticate } = require("./auth/authenticate");

const PORT = 9090;
const server = express();
server.use(express.json());

server.post("/register", (req, res) => {
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 14);
  creds.password = hash;
  db("users")
    .insert(creds)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(() => {
      res.status(500).json({ error: "Unable to register user" });
    });
});

function generateToken(user) {
  const payload = {
    username: user.username,
    userId: user.id,
    roles: ["admin", "student"]
  };
  const secret = process.env.JWT_SECRET;

  const options = {
    expiresIn: "45m"
  };
  return jwt.sign(payload, secret, options);
}

server.post("/login", (req, res) => {
  const creds = req.body;
  db("users")
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        //login is successful
        //create token
        const token = generateToken(user);
        res
          .status(200)
          .json({ message: `${user.username} is logged in`, token });
      } else {
        res.status(401).json({ message: "You shall not pass!" });
      }
    })
    .catch(() =>
      res.status(500).json({ message: "Please try logging in again." })
    );
});

function checkRole(role) {
  //piece of mw
  return function(req, res, next) {
    if (req.decodedToken.roles.includes(role)) {
      next();
    } else {
      res
        .status(403)
        .json({ message: `I know who you are, but you need to be an ${role}` }); //403 i know who you are, but you don't have access
    }
  };
}

//protect this endpoint so only logged in users can see the data
server.get('/users', authenticate, checkRole('admin'), (req, res) => {
	db('users')
		.select('id', 'username') //<----NEVER EVER SEND THE PASSWORD BACK TO THE CLIENT
		.then(users => {
			res.json({ users, decodedToken: req.decodedToken })
		})
		.catch(() => {
			res.status(500).json({ message: 'You shall not pass!' })
		})
})

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
