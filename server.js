const express = require("express");
const helmet = require("helmet");
const usersRouter = require("./users/usersRouter");
const authRouter = require("./auth/authRouter");
const jwt = require("jsonwebtoken");

const server = express();

server.use(helmet());
server.use(express.json());

server.use("/api", usersRouter);
server.use("/api", authRouter);

server.get("/token", (req, res) => {
  const payload = {
    subject: "user",
    userid: "bdavis",
    favoriteGame: "The Witcher 3"
  };

  const secret = "this is the secret";

  const options = {
    expiresIn: "8h"
  };

  const token = jwt.sign(payload, secret, options);
  res.json(token);
});
module.exports = server;
