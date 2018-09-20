const express = require("express");
const server = express();
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

server.use(express.json());
server.use(cors());



const auth = () => {
    //auth using token
}



server.post("/register", (req, res) => {
    const creds = req.body;
    const hash = bcrypt.hashSync(creds.password, 12);
    creds.password = hash;

    debug("users")
        .insert(creds)
        .then(ids =>{
            const id = ids[0];
            //generate token 

            //attach that token to the response
            res.status(201).json(id);
        })
        .catch(err => res.status(500).send(err));
})


server.post("/api/login", (req, res) => {
    const creds = req.body;
    db("users")
      .where({ username: creds.username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(creds.password, user.password)) {
          req.session.username = user.username;
          res.status(200).json(`Welcome ${creds.username}`);
        } else {
          res
            .status(401)
            .json({ message: "You shall not pass! Go Back to the Shadows!" });
        }
      })
      .catch(err => res.status(500).send(err));
  });


  server.get("/api/users", auth, (req, res) => {
    db("users")
      .select("id", "username", "password")
      .then(users => {
        res.json(users);
      })
      .catch(err => res.json({ message: "Please login to access information" }));
  });


  
  //router post
  
  server.get("/api/logout", (req, res) => {
    if (req.session) {
      req.session.destroy(err => {
        if (err) {
          res.send("error logging out");
        } else {
          res.send("good bye");
        }
      });
    }
  });
  
  
  server.get("/api/users", auth, (req, res) => {
    db("users")
      .select("id", "username", "password")
      .then(users => {
        res.json(users);
      })
      .catch(err => res.json({ message: "Please login to access information" }));
  });       




server.listen(8000, () => console.log("======API running on Port 8000======"));