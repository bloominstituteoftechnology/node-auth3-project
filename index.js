require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const server = express();

const UserRouter = require("./Routers/UserRouter");
const LoginRouter = require("./Routers/LoginRouter");
const RegisterRouter = require("./Routers/RegisterRouter");

server.use(express.json()); //make sure this is first or stuff breaks
server.use("/api/users", UserRouter);
server.use("/api/login", LoginRouter);
server.use("/api/register", RegisterRouter);
server.use(cors());
server.use(helmet());

server.listen(4200, () => console.log("running on port 4200"));
