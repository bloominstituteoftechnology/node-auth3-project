//import dotenv
require("dotenv").config();

//create express server
const express = require("express");
const server = express();

//3rd party & built in middleware
server.use(express.json());
const cors = require("cors");
server.use(cors());

//test route to check server
server.get("/", (req, res) => {
  res.json("Working!!");
});

//import route handlers
const usersRoutes = require("./Routers/usersRouter");
server.use("/api/", usersRoutes);

//Listener
const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`);
});
