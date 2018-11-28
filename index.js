//bring in dependencies
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const morgan = require('morgan')
const db = require('./database/dbConfig')
const jwt = require('jsonwebtoken');

//call the dependencies
const server = express();
server.use(express.json());
server.use(cors());
server.use(morgan());
server.use(helmet());

//test to make sure server works
server.get("/api", (req, res) => {
    res.send("Welcome To The Black Parade!");
});


//port
server.listen(3300, () => console.log('\nrunning on port 3300\n'));