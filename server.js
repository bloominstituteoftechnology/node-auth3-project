const express = require("express");
const UsersModel = require("./users-model");

const server = express();

server.use(express.json());
server.use("/api", apiRouter);

// =============== TEST ===============
server.get("/", (req, res) => {
  res.send("Hello from GET /");
});

// =============== REGISTER ===============
server.post("/api/register", (req, res) => {
  let user = req.body;

  if (!user.username || !user.password) {
    res.status(400).json({ message: "Please provide username and password. " });
  } else {
    UsersModel.add(user)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(error => {
        res
          .status(500)
          .json({ message: "There was an error registering the user." });
      });
  }
});

// =============== LOGIN ===============
server.post("/api/login", (req, res) => {});

// =============== GET USERS ===============
server.get("/api/users", (req, res) => {});

module.exports = server;
