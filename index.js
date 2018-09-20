const express = require("express");
const server = express();
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const db = require("./dbconfig.js");
 server.use(express.json());
 const secret = "welcome to goodburger"
   function generateToken(user) {
    const payload = {
        username: user.username
    };
    const options = {
        expiresIn: '1h',
        jwtid: '12345',
    }
    return jwt.sign(payload, secret, options)
}
 function protected(req, res, next) {
    const token = req.headers.authorization;
    if(token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if(err) {
                res.status(401).json({message: "token invalid"})
            } else {
                req.user = {username: decodedToken.username};
                next();
            }
        })
    } else {
        res.status(401).json({message: "no token"})
    }
  }
 server.get("/", (req, res) => {
  res.send("hello there! this page is empty");
});
 server.post("/register", (req, res) => {
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 3);
  creds.password = hash;
  db("users")
    .insert(creds)
    .then(ids => {
      const id = ids[0];
       db('users').where({id}).first().then(user => {
          const token = generateToken(user);
          res.status(201).json({id: user.id, token});
      }).catch(err => res.status(500).send(err))
      
    })
    .catch(err => res.status(500).send(err));
});
 server.get("/users", protected, (req, res) => {
  db("users")
    .select("id", "username", "department")
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});
 server.post("/login", (req, res) => {
    const creds = req.body;
  db("users")
    .where("username", creds.username)
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({token});
      } else {
        res.status(401).json({ message: "login invalid" });
      }
    })
    .catch(err => res.status(500).send(err));
});

 server.listen(4000, () =>
  console.log("\n~~~~~~ Listening on port 4000 ~~~~~~\n")
);
