const express = require("express");
const server = express();

const cors = require("cors")
const helmet = require("helmet");
const morgan = require("morgan");

const usersRouter = require("./routers/usersRouter");

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan("dev"));

server.use("/api", usersRouter);

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`server is now running on port ${PORT}`);
});