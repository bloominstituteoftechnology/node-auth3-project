require('dotenv').config();

const express = require('express');
const cors = require ('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require("./data/dbConfig.js");

const server = express();

server.use(express.json());
server.use(cors());

const port = 9000;
const rounds = 14;

server.post("/api/register", (req, res) => {
    
});

server.get("/", (req, res) => {
    res.send("We are live!");
});

server.listen(port, () => console.log(`\nRunning on port ${port}\n`));
