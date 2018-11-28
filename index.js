require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("./data/dbConfig.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

//function that will generate a new JWT to be used upon successful login
function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    department: user.department
  };

  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: "1h"
  };

  return jwt.sign(payload, secret, options);
}

//function that will first verify if user has good token and therefore has access to restricted endpoints
function restricted(req, res, next) {
  // grab token from authorization header
  const token = req.headers.authorization;
  // step one: does the token exist?
  if (token) {
    // step two: is the token valid?
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        //token couldn't be decoded, so invalid
        res.status(401).json({ message: "invalid token" });
      } else {
        //token is good, authorization granted!
        //put decoded token on the req
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    // no token, bounce 'em out
    res.status(401).json({ message: "no token provided" });
  }
}

// register new user
server.post("/api/register", (req, res) => {
  // grab submitted user info from re
  const user = req.body;

  if (!user.username || !user.password || !user.department) {
    res.status(400).json({
      message: "Please fill out all fields before attempting to register."
    });
  } else {
    // generate hash form password
    const hash = bcrypt.hashSync(user.password, 14);
    //override submitted password with the hash
    user.password = hash;
    //save to db
    db("users")
      .insert(user)
      .then(id => {
        res.status(201).json(id);
      })
      .catch(err =>
        res
          .status(500)
          .json({ error: "Error while registering new user: ", error })
      );
  }
});

// login endpoint, will create JWT to later be verified before accessing secure endpoints
server.post("/api/login", (req, res) => {
  const creds = req.body;

  if (!creds.username || !creds.password) {
    res.status(400).json({
      message: "Please fill out both fields before attempting to log in."
    });
  } else {
    db("users")
      .where({ username: creds.username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(creds.password, user.password)) {
          // passwords match and user with that username exists
          //create a JWT which we send manually
          const token = generateToken(user);
          res.status(200).json({ message: "Enter, friend!", token });
        } else {
          //either username or password is invalid, but we don't specify which
          res.status(401).json({ message: "You shall not pass!" });
        }
      })
      .catch(err =>
        res
          .status(500)
          .json({ error: "Error occurred during login attempt: ", err })
      );
  }
});

// GET list of all users in db ONLY IF the current user has a valid token
server.get("/api/users", restricted, (req, res) => {
  //this block only runs if authorization already verified, so let's get right to it
  db("users")
    //following line completes stretch goal but can be taken out for testing MVP
    //will only return a list of users with the same department as the logged-in user's department(read on decoded token)
    .where({ department: req.decodedToken.department })
    .select("id", "username") //never pull password in production, but this is just to verify it was saved as hash
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err =>
      res.status(500).json({ error: "Error while retrieving users: ", err })
    );
});

server.listen(7000, () => console.log("\n=== Running on port 7000 ===\n"));
