const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const db = require("./data/dbConfig.js");

const server = express();

server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  res.send("Server Up And Running");
});

const port = 3000;
server.listen(port, () => console.log(`\nRunning on port ${port}\n`));
