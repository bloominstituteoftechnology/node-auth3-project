const express = require("express");

const configMdlware = require("./config/middleware");

const server = express();
configMdlware(server);

server.get("/", (req, res) => {
  res.send("Welcome to Auth-ii Project");
});

module.exports = server;
