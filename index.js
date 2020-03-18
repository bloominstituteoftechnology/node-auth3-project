const express = require("express")
const server = express()
const port = 5000;
const cookieParser = require("cookie-parser")
server.use(express.json())
server.use(cookieParser())
const auth = require("./auth/auth-router")
const users = require("./users/users-router")

server.use("/auth", auth)
server.use("/users", users)


server.get("/", (req, res, next) => {
    res.json({ message: "Server up and running" })
})

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({ message: "Something went wrong" })
})

server.listen(port, () => {
    console.log(`Running at http://localhost:${port}`)
})