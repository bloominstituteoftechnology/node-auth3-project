var express = require("express");
var router = express.Router();
const db = require("../database/dbConfig");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secret = process.env.SECRET || "jwt-secret";
function genToken(username, department) {
  const options = {
    expiresIn: "1h",
    jwtid: "1998"
  };
  return jwt.sign({ username, department }, secret, options);
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/register", async (req, res, next) => {
  try {
    const salt = getRandomArbitrary(10, 50);
    const hash = await bcrypt.hash(req.body.password, salt);
    res.status(200).json(
      await db(`users`).insert({
        username: req.body.username,
        password: hash,
        department: req.body.department
      })
    );
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const hashPass = await db(`users`)
      .where({ username: req.body.username })
      .select("password");

    if (await bcrypt.compare(req.body.password, hashPass[0].password))
      res
        .status(200)
        .json({ status: true, token: genToken(req.body.username, req.body.department) });
    else res.status(200).json({ status: false });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
