const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const KnexSessionStore = require("connect-session-knex")(session);
const db = require("./db/dbConfig.js");

const server = express();

//========Session/Cookie Configuration=====//
const sessionsConfig = {
  name: "monkey",
  secret: "nobody tosses a dwarf!",
  cookie: {
    maxAge: 1 * 24 * 60 * 60 * 1000,
    secure: false
  },
  httpOnly: true,
  resave: false,
  saveUninitialized: false,
  store: new KnexSessionStore({
    tablename: "sessions",
    sidfieldname: "sid",
    knex: db,
    createtable: true,
    clearInterval: 1000 * 60 * 60
  })
};
//========Session/Cookie Configuration=====//

server.use(session(sessionsConfig));
server.use(express.json());
server.use(cors());

const secret = "Shhh don't tell anyone!";

//============MIDDLEWARE==============//
function generateToken(user) {
  const payload = {
    username: user.username
  };
  const options = {
    expiresIn: "1h",
    jwtid: "12345"
  };
  return jwt.sign(payload, secret, options);
}

function protected(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ Error: "Invalid Token" });
      } else {
        console.log("DecodedToken: ", decodedToken);
        req.username = decodedToken.username;
        next();
      }
    });
  } else {
    res.status(401).json({ Error: "No Token Provided" });
  }
}
//============MIDDLEWARE==============//

//==========GET USERS ENDPOINT==========//
server.get("/api/users", protected, (req, res) => {
  db("users")
    .select("id", "username", "password", "department")
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      console.log("Error: ", err);
      res.status(500).json({ Error: "Users cannot be received" });
    });
});
//==========GET USERS ENDPOINT==========//

//=========POST REGISTER ENDPOINT======//
server.post("/api/register", (req, res) => {
  const creds = req.body;

  const hash = bcrypt.hashSync(creds.password, 3);

  creds.password = hash;

  db("users")
    .insert(creds)
    .then(ids => {
      const id = ids[0];

      db("users")
        .where({ id })
        .first()
        .then(user => {
          const token = generateToken(user);
          res.status(200).json({ id: user.id, token });
        })
        .catch(err => {
          console.log("Error: ", err);
          res.status(500).json({ Error: "No Users" });
        });
    })
    .catch(err => {
      console.log("Error: ", err);
      res.status(500).json({ Error: "No Users could be posted" });
    });
});
//=========POST REGISTER ENDPOINT======//

//========POST LOGIN ENDPOINT========//
server.post("/api/login", (req, res) => {
  const creds = req.body;

  db("users")
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ id: user.id, token });
        req.session.username = user.username;
        res
          .status(200)
          .send(`Welcome ${req.session.username} To Lambda School`);
      } else {
        res.status(401).json({ Error: "Cannot Authorize" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ Error: "Login Failed" });
    });
});
//========POST LOGIN ENDPOINT========//

//========GET LOGOUT ENDPOINT=======//
server.get("/api/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.send("Error With Logging Out");
      } else {
        res.send("Good-Bye!");
      }
    });
  }
});
//========GET LOGOUT ENDPOINT=======//


server.listen(6500, () => console.log("\n====Running On Port 6500====\n"));