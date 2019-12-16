const express = require("express");
const server = express();
server.use(express.json());

const registerRouter = require("./register/registerRouter.js");

server.get("/", (req, res) => {
  res.send("<h1>Welcome</h1>");
});

server.use("/register", registerRouter);
module.exports = server;
