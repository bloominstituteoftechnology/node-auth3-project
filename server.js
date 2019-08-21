const express = require("express");

const server = express();

server.use(express.json());
server.use("/api", apiRouter);

// =============== TEST ===============
server.get("/", (req, res) => {
  res.send("Hello from GET /");
});

// =============== REGISTER ===============
server.post("/api/register", (req, res) => {});

// =============== LOGIN ===============
server.post("/api/login", (req, res) => {});

// =============== GET USERS ===============
server.get("/api/users", (req, res) => {});

module.exports = server;
