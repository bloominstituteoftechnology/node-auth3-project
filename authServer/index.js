const express = require("express");
const cors = require("cors");
const port = 9001;
const server = express();

server.use(express.json());
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

server.listen(port, () =>
  console.log(`\n === API running on port ${port} ===\n`)
);
