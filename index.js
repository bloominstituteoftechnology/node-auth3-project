const express = require("express");
const server = express();
const bcrypt = require("bcryptjs");
const db = require("./data/db");

// use middleware
server.use(express.json());

// endpoints
server.get("/", (req, res) => {
  res.status(200).json("up and running...");
});

// POST /api/register
server.post("/api/register", (req, res) => {
  const new_user = req.body;
  db("users")
    .insert(new_user)
    .into("users")
    .then(res.status(200).json("USEER CREATED SUCCESSFULLY"))
    .catch(error => res.status(500).json(error.message));
});

// POST /api/login

// GET /api/users

// run server
const port = 8000;
server.listen(port, () => {
  console.log(`\n=== WEEB API LISTENING ON HTTP://LOCALHOST:${port} ===`);
});
