//require("dotenv").config();

//const jwt = require("jsonwebtoken");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

module.exports = server => {
  // const protected = async (req, res, next) => {
  //   const token = await req.headers.authorization;
  //   console.log(token);
  //   const { path } = req;
  //   let reg = /(?:api\/)(\w+)\/*/g;
  //   let destination = reg.exec(path)[1];
  //   if (destination === "users") {
  //     if (token) {
  //       jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
  //         console.log(decodedToken)
  //         if (err) {
  //           return res.status(401).json({ message: "Broken Token" });
  //         } else {
  //           req.decodedToken = decodedToken;
  //           next();
  //         }
  //       });
  //     } else {
  //       return res.status(401).json({ message: "No Token, No Dice" });
  //     }
  //   }
  //   next();
  // };
  server.use(express.json());
  server.use(cors());
  //server.use(protected);
  server.use(helmet());

  return server;
};
