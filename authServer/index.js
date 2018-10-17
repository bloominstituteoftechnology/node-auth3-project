const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../data/dbConfig.js");
const morgan = require("morgan");
const cors = require("cors");
const port = 9001;
const server = express();

server.use(express.json());
server.use(morgan("dev"));
server.use(cors());

server.post("/api/signup", async (req, res) => {
  try {
    const credentials = req.body;
    const hash = bcrypt.hashSync(credentials.password, 14);
    credentials.password = hash;
    const newUser = await db("users").insert(credentials);
    try {
      const user = await db("users")
        .where({ id: newUser[0] })
        .first();
      req.session.username = user.username;
      return res.status(201).json(user);
    } catch (error) {
      return res
        .status(404)
        .json({ message: "User is broken.", error: error.message });
    }
  } catch (error) {
    return res.status(500).json({ message: "User could not be registered." });
  }
});

server.post("/api/signin", async (req, res) => {
  try {
    const credentials = req.body;
    const user = await db("users")
      .where({ username: credentials.username })
      .first();
    if (user && bcrypt.compareSync(credentials.password, user.password)) {
      // added session username
      req.session.username = user.username;
      return res.status(200).json({ message: `${user.username} logged in.` });
    } else {
      return res
        .status(404)
        .json({ message: "You shall not pass your attempt was logged!" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred during the login." });
  }
});

server.listen(port, () =>
  console.log(`\n === API running on port ${port} ===\n`)
);
