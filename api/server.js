const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const authRouter = require("../routers/auth/auth-router");
const usersRouter = require("../routers/users/users-router");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);

server.get("/", (req, res) => {
  res.send("server running");
});

module.exports = server;
