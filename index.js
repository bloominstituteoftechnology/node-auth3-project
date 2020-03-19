const express = require("express");
const server = express();
const cookieParser = require ("cookie-parser")
require("dotenv").config()

const logger = require("./middleware/Goldberg");

const authRouter = require("./auth/authRouter")
const usersRouter = require("./users/usersRouter")

server.use(express.json());
server.use(cookieParser())
server.use(logger);

server.get("/", (req, res) => {
  res.status(200).json({ message: "Here, have a balloon" });
});

server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Something went wrong",
	})
})


server.use("/auth", authRouter)
server.use("/users", usersRouter)

const PORT = 4000

server.listen(PORT, () => {
    console.log(`server listening at http://localhost:${PORT}...`);
  });
  