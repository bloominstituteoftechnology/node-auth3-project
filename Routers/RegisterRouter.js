const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../database/dbconfig");

const router = express.Router();
router.use(express.json());

router.post("/", (req, res) => {
  //get username and password from body
  const creds = req.body;
  //generate hash
  const hash = bcrypt.hashSync(creds.password, 10);
  //override the password with hash
  creds.password = hash;
  db("users")
    .insert(creds)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => json({ message: "error adding user to the DB", err }));
});

module.exports = router;
