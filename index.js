const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const restrictedRoutes = require("./routes/restrictedRoutes");
const errorHandler = require("./middleware");

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan("dev"));

server.use("/api", authRoutes);
server.use("/api/restricted", restrictedRoutes);

// server.use(errorHandler);

const port = 8000;
server.listen(port, function() {
	console.log(`\n === Web API Listening on http://localhost:${port}===`);
});
