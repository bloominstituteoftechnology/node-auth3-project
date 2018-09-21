const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("./db/dbConfig.js");

const server = express();
server.use(express.json());
server.use(cors());

const secret = "y"; // the secret usually will come from teh environmental variable or the server than be hardcoded
function generateToken(user) {
  const payload = {
    username: user.username,
    dept: user.dept
  };

  const options = {
    expiresIn: "1h",
    jwtid: "12345" //jti
  };

  return jwt.sign(payload, secret, options);
}

function protected(req, res, next) {
  // use jwts instead of sessions
  //read the token string from the authorization header
  const token = req.headers.authorization;
  if (token) {
    //verify the token
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        //token is invalid
        res.status(401).json({ message: "invalid token" });
      } else {
        //token is valid
        console.log(decodedToken);
        //req.user.username = decodedToken.username by making the token an object you can pass keys through. some libraries decode the tokens payload and put it in a req.user
        req.username = decodedToken.username;
        req.dept = decodedToken.dept;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "no token provided" });
  }
}

server.get("/", (req, res) => {
  res.send("Its Alive!");
});

server.post("/api/register", (req, res) => {
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 10);
  creds.password = hash;
  db("users")
    .insert(creds)
    .then(ids => {
      const id = ids[0];
      //find the user by using the id.
      db("users")
        .where({ id })
        .first()
        .then(user => {
          // generate a token
          const token = generateToken(user);
          //return 201, attach token to the response
          res.status(201).json({ id: user.id, token });
        })
        .catch(err => res.status(500).send(err));
    })
    .catch(err => res.status(500).send(err));
});

server.post("/api/login", (req, res) => {
  //grab creds
  const creds = req.body;

  //find user
  db("users")
    .where({ username: creds.username })
    .first()
    .then(user => {
      //check creds
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        //generate a token
        const token = generateToken(user);

        //attach that token to the response.
        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: "you shall not pass!" });
      }
    })
    .catch(err => res.status(500).send(err));
});

server.get("/api/users", protected, (req, res) => {
  // you can do this because of the req.user.username = decodedToken.username by making the token an object you can pass keys too. some libraries take decode the tokens payload and put it in a req.user for you. then you can do the below
  // if (req.user.roles.includes("admin")) {
  // }
  db("users")
    .select("id", "username", "dept")
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

server.get("/", (req, res) => {
  res.send("Its Alive!");
});

server.listen(4000, () => console.log("\nrunning on port 4000\n"));
