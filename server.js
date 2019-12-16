const express = require("express");
const session = require("express-session");
const server = express();
server.use(express.json());

const registerRouter = require("./register/registerRouter.js");
const loginRouter = require("./login/loginRouter");
const userRouter = require("./users/usersRouter");
const logoutRouter = require("./logout/logoutRouter.js");

server.use(
  session({
    name: "notsession",
    secret: "nobody tosses a dwarf!",
    cookie: {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      secure: false,
      httpOnly: true
    },
    resave: false,
    saveUninitialized: false
  })
);
server.get("/", (req, res) => {
  res.send("<h1>Welcome</h1>");
});

server.use("/register", registerRouter);
server.use("/login", loginRouter);
server.use("/users", userRouter);
server.use("/logout", logoutRouter);
module.exports = server;
