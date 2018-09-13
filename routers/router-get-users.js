const express = require("express");
const verifyToken = require("../routers-middleware/verifyToken.js");
const usersRouter = express.Router();

const db = require("../db/dbConfig.js");

usersRouter.get("/", verifyToken, (req, res) => {
  db("users")
    .select("id", "username", "department")
    .where({department: req.department.department})
    .then(users => {
      if (users) {
        users.loggedIn = req.user; 
        res.status(200).json({users, loggedIn: req.user, department: req.department});
      } else {
        res.status(500).json({ errorMessage: "Problems with your request" });
      }
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

module.exports = usersRouter;
