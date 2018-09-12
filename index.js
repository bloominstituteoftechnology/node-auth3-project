const express = require("express");



const userRoutes = require("./routes/userRoutes");
const server = express();
server.use(express.json())

server.use("/users", userRoutes);

server.get("/", (req, res) => {
    res.send("It's working")
})

const port = 8000;
server.listen(port, function(){
    console.log(`\n=====API running on ${port}`)
})