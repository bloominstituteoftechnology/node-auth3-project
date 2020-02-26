const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const restricted = require('./auth/restricted-middleware');
const authRouter = require('./auth/auth-router');
const usersRouter = require('./users/user-router');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter)
server.use("/api/users", restricted, checkRole("user"), usersRouter);
server.get("/", (req, res) => {
  res.status(200).json({succesMessage: "Server is up and running"})
});

module.exports = server;

function checkRole(role) {
  return (req, res, next) => {
    if (
      req.decodedToken &&
      req.decodedToken.role &&
      req.decodedToken.role.toLowerCase() === role
    ) {
      next();
    } else {
      res.status(403).json({ you: "shall not pass!" });
    }
  };
}
