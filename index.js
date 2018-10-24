/// ---- Node Dependencies ----
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/// ---- Instantiate Express Server ----
const server = express();

/// ---- Instantiate Database ----
const db = require("./data/expressDb");

/// ---- Connect Middleware ----
server.use(express.json(), cors(), helmet());

///// ---------- CRUD Enpoints ----------
/// ---- Sanity Check CRUD Endpoint ----
server.get("/", (request, response) => {
  response.send(`IT'S ALIVE!!!`);
});

/// ---- Server Port and Listen Method ----
const port = 9999;
server.listen(
  port,
  console.log(`\n#####~> --Server Active on Port ${port}-- <~#####\n`)
);
