const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("./db/helpers");
const server = express();

server.use(express.json());
server.use(cors());

function generateToken(user) {
  const payload = {
    username: user.username
  };
  const secret = "theLawOfAttraction";
  const options = {
    expiresIn: "2d",
    jwtid: 33333
  };
  return jwt.sign(payload, secret, options);
}

server.get('/', (req, res) => {
    res.send("does this server even work")
})
server.post("/api/register", (req, res) => {
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 14);
  creds.password = hash;

  db.register(creds)
    .then(user => {
     const token = generateToken(user);
      return res.status(200).json({msg: `Account ${user.username} was created`,
                                   token: token});
    })
    .catch(err => res.send(err));
});

const port = process.env.PORT || 7000;
server.listen(port, () => console.log(`Listening on port ${port}`));
