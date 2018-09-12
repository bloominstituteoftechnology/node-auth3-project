"use strict";
// dependencies
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
// routes
const userRoutes = require("../routes/userRoutes.js");

module.exports = server => {
  server.use(helmet());
  server.use(express.json());
  server.use(morgan("dev"));
  server.use("/api", userRoutes);
};
