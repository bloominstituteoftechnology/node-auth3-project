const express = require("express");
const server = express();

const UsersRouter = require("./routes/usersRouter.js");

server.use(express.json());

server.use("/api", UsersRouter);
module.exports = server;
