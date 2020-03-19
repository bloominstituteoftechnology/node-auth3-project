const express = require("express");
const router = express.Router();
const db = require("./authModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config()

router.post("/register", async (req, res, next) => {
  try {
    const incoming = {
      name: req.body.name,
      password: req.body.password,
      department: req.body.department
    };
    const newUser = await db.createUser(incoming);
    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const incoming = {
      name: req.body.name,
      password: req.body.password
    };
    const user = await db.findByName(incoming.name);
    const pass = await bcrypt.compare(incoming.password, user.password);
    if (!user || !pass) {
      return res
        .status(401)
        .json({ message: "Either the name or password is wrong." });
    }

    const payload = {
      subject: user.id,
      department: user.department
    };
    const token = jwt.sign(payload, process.env.SECRET);
    res.status(200).cookie("token",token).json({message:`welcome ${user.name}`, token:token})
  } catch (error) {
    next(error);
  }
});

module.exports = router;
