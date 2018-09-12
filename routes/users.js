var express = require("express");
var router = express.Router();
const db = require("../database/dbConfig");
const jwt = require("jsonwebtoken");

const secret = process.env.SECRET || "jwt-secret";

function _protected(req, res, next) {
  const token = req.headers.authorization;
  if (token)
    jwt.verify(token, secret, (err, decodeToken) => {
      if (err) next(err);
      req.username = decodeToken.username;
      req.department = decodeToken.department;
      next();
    });
  else next(new Error("No token in header"));
}

router.get("/", _protected, async (req, res, next) => {
  try {
    res.status(200).json(
      await db(`users`)
        .where({ department: req.department })
        .select("id", "username", "department")
    );
  } catch (err) {
    next(err);
  }
});

module.exports = router;
