const express = require("express");
const cores = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const db = require("./db/dbConfig.js");

const server = express();
const PORT = 4000;

server.use(express.json());

server.get("/", (req, res) => {
  res.status(201).send("Working");
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
