const express = require("express");
const server = express();
const cors = require("cors");
const bcrypt = require("bcryptjs");
// const db = require()


server.use(express.json());
server.use(cors());



server.get("/", (req, res) => {
    res.send("Hello World");
})


server.post("/register", (req, res) => {
    const creds = req.body;
    const hash = bcrypt.hashSync(creds.password, 12);
    creds.password = hash;

    debug("users")
        .insert(creds)
        .then(ids =>{
            const id = ids[0];
            res.status(201).json(id);
        })
        .catch(err => res.status(500).send(err));
})


server.listen(8000, () => console.log("======API running on Port 8000======"));