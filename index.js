const express = require("express");
const server = express();

const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const { router } = require("./routers/usersRouter");

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan("dev"));

server.use("/api", router);

const PORT = 4200;
server.listen(PORT, () => {
  console.log(`server is now running on port ${PORT}`);
});
