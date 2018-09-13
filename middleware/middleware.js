"use strict";
// dependencies
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
// routes
const userRoutes = require("../routes/userRoutes.js");
// port
const PORT = 3001;

const errorHandler = (err, req, res, next) => {
  console.log(err);
  switch (err.code) {
    case 404:
      res.status(404).json({
        message: "The requested user does not exist.",
      });
    case 401:
      res.status(401).json({
        message: "You shall not pass!",
      });
    case 406:
      res.status(406).json({
        message: "Please provide a username and password.",
      });
    case 400:
      res.status(400).json({
        message: "Missing Token. (Need to login)",
      });
      break;
    default:
      res.status(500).json({
        message: "There was an error performing the required operation",
      });
      break;
  }
};

module.exports = server => {
  server.use(cors({ credentials: true, origin: `http://localhost:${PORT}` }));
  server.use(helmet());
  server.use(express.json());
  server.use(morgan("dev"));
  server.use("/api", userRoutes);
  server.use(errorHandler);
};
