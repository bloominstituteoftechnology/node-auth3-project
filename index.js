const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const helmet = require("helmet");
const morgan = require("morgan");
// import routers
const registerRouter = require("./routers/router-register.js");
const loginRouter = require("./routers/router-login.js");
const usersRouter = require("./routers/router-get-users.js");
//import routers
const server = express();
//secret
const secret = "pair pare pear";

//route variables

//middleware
server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(morgan("short"));
//middleware^^

//routes
const REGISTER = "/api/register";
server.use(REGISTER, registerRouter);
const LOGIN = "/api/login";
server.use(LOGIN, loginRouter);
const USERS = "/api/users";
server.use(USERS, usersRouter);
//routes^

const PORT = 9000;
server.get("/", (req, res) => {
  res.send(`Server started on port ${PORT}`);
});

server.listen(PORT);
