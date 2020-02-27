const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());


server.get('/', (req, res) => {
    res.send(`Server Running`)
})

module.exports = server;