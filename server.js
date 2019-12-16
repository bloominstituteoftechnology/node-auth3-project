const express = require("express");
const session = require("express-session");
const server = express();
server.use(express.json());

const registerRouter = require("./register/registerRouter.js");
const loginRouter = require("./login/loginRouter");

server.use(
  session({
    name: "notsession", // default is connect.sid
    secret: "nobody tosses a dwarf!",
    cookie: {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      secure: true
    },
    httpOnly: true,
    resave: false,
    saveUninitialized: false
  })
);
server.get("/", (req, res) => {
  res.send("<h1>Welcome</h1>");
});

server.use("/register", registerRouter);
server.use("/login", loginRouter);
module.exports = server;
