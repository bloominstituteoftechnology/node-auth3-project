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

// register new user
server.post("/api/register", (req, res) => {
  // grab submitted student info from re
  const student = req.body;

  if (!student.username || !student.password || !student.department) {
    res
      .status(400)
      .json({
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

server.listen(7000, () => console.log("\n=== Running on port 7000 ===\n"));
