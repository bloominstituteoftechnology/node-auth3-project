const express = require("express");
const server = express();
const knex = require("knex");
const dbConfig = require('./knexfile');
const bcrypt = require('bcryptjs');
const db = knex(dbConfig.development); 
const PORT = 4000;

server.use(express.json());




server.listen(PORT, () => {
    console.log("server is running in port " + PORT)
})