const express = require("express");
const server = express();
const bcrypt = require("bcryptjs");
const db = require("./data/db");

// use middleware
server.use(express.json());

// endpoints

// run server
const port = 8000;
server.listen(port, () => {
  console.log(`\n=== WEEB API LISTENING ON HTTP://LOCALHOST:${port} ===`);
});
