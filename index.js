const express = require("express");
const jwt = require("jsonwebtoken");
const bcyrpt = require("bcryptjs");

const db = require("./data/dbConfig");
const configureMiddleware = require("./middleware");

const server = express();
const PORT = 3300;

configureMiddleware(server);

server.get("/", (req, res) => {
    res.send("Live Server!");
  });

  server.listen(PORT, () => {
    console.log(`\n=== API Listening on http://localhost:${PORT} ===\n`);
  });