const express = require("express");
const jwt = require("jsonwebtoken");

const configureMiddleware = require("./config/middleware");
const db = require("./data/dbConfig");

// Create server
const server = express();
const PORT = 3000;

// Middlware
configureMiddleware(server);

// Test server
server.get("/", (req, res) => {
  res.send("🔑 🔑 🔑");
});

// Listen
let date = Date();
server.listen(PORT, () => {
  console.log(`\n=== API Listening on http://localhost:${PORT} ===\n`);
  console.log(`===== Updated on ${date} =====\n`);
});
