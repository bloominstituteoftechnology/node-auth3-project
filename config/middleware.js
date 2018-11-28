const express = require("express");
const cors = require("cors");
const helmet = require("helmet");


module.exports = server => {
  const protected = (req, res, next) => {
    const {path} = req
    let reg = /(?:api\/)(\w+)\/*/g
    let destination = reg.exec(path)[1]
    if (destination === 'users'){
        if (0) {
            return res.status(401).json({ message: "kick rocks, snoopy!" });
          } 
    }
    next();
  };
  server.use(express.json());
  server.use(cors());
  server.use(protected);
  server.use(helmet());

  return server;
};
