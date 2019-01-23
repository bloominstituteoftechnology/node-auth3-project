const express = require("express");
const knex = require("knex");
const knexConfig = require("./knexfile.js");
const db = knex(knexConfig.development);
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const server = express();

server.use(express.json());

server.post("/api/register", (req, res) => {
    
});

server.post("/api/login", (req, res) => {
    
});

server.get("/api/users", (req, res) => {
    
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});