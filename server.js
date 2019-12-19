const express = require("express");
const server = express();
server.use(express.json());
const cors = require("cors");
server.use(cors());

const registerRouter = require("./register/registerRouter.js");
const loginRouter = require("./login/loginRouter");
const userRouter = require("./users/usersRouter");
const logoutRouter = require("./logout/logoutRouter.js");

server.get("/", (req, res) => {
  res.send("<h1>Welcome</h1>");
});

server.use("/register", registerRouter);
server.use("/login", loginRouter);
server.use("/users", userRouter);
server.use("/logout", logoutRouter);
module.exports = server;
