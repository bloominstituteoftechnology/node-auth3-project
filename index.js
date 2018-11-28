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
    username: user.username
  };

  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: "1h"
  };

  return jwt.sign(payload, secret, options);
}

// register new user
server.post("/api/register", (req, res) => {
  // grab submitted student info from re
  const student = req.body;

  if (!student.username || !student.password || !student.department) {
    res.status(400).json({
      message: "Please fill out all fields before attempting to register."
    });
  } else {
    // generate hash form password
    const hash = bcrypt.hashSync(student.password, 14);
    //override submitted password with the hash
    student.password = hash;
    //save to db
    db("students")
      .insert(student)
      .then(id => {
        res.status(201).json(id);
      })
      .catch(err =>
        res
          .status(500)
          .json({ error: "Error while registering new student: ", error })
      );
  }
});

server.post("/api/login", (req, res) => {
  const creds = req.body;

  if (!creds.username || !creds.password) {
    res.status(400).json({
      message: "Please fill out both fields before attempting to log in."
    });
  } else {
    db("students")
      .where({ username: creds.username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(creds.password, user.password)) {
          // passwords match and student with that username exists
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

server.listen(7000, () => console.log("\n=== Running on port 7000 ===\n"));
