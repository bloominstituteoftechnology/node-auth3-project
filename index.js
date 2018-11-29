require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const server = express();

const UserRouter = require("./Routers/UserRouter");
const LoginRouter = require("./Routers/LoginRouter");
const RegisterRouter = require("./Routers/RegisterRouter");

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use("/api/users", UserRouter); //make sure the routes are always last in the list
server.use("/api/login", LoginRouter);
server.use("/api/register", RegisterRouter);

server.listen(4200, () => console.log("running on port 4200"));
