const express = require("express");
const router = express.Router();
const db = require("./authModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
      name: user.name
    };
    const options = {
      expiresIn: "1d"
    };
    const token = jwt.sign(
      payload,
      secrets.jwtSecret || "topsecret",
      options
    );
    res.cookie("token", token);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
