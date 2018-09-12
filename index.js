const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const session = require("express-session");

const KnexSessionStore = require("connect-session-knex")(session);

const db = require("./database/dbConfig");

const server = express();

server.use(express.json());
server.use(cors());

const secret = "one two three";

function generateToken(user) {
  const payload = {
    username: user.username
  };
  const options = {
    expiresIn: "1hr",
    jwtid: "12345"
  };
  return kwt.sign(payload, secret, options);
}
server.post("/api/register", (req, res) => {
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 10);
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
          res.status(201).json({ id: user.id, token });
        })
        .catch(err => res.status(500).send(err));
    })
    .catch(err => res.status(500).send(err));
});

function protected(req, res, next){
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token, secret, (err, decodedToken)=>{
            if(err){
                res.status(401).json({message: "Invalid Token"});
            }else{
                req.user = { username: decodedToken.username}; 
                next(); 
            }
        })
    }else{
        res.status(401).json({message: "no token provided"});
    }
}

server.post("/api/login", (req, res)=> {
    const creds = req.body; 

    db("users")
        .where({ username: creds.username })
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(creds.password, user.password)){
                const token = generateToken(user); 

                res.status(200).json({token}); 
            }else{
                res.status(401).json({message: "you shall not come in"})
            }
        })
        .catch(err => res.status(500).send(err)); 
})

server.get("/", (req, res) => {
  res.send("welcome");
});

server.listen(3300, () => console.log("\n Server 3300 is running \n"));
