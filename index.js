/*
| POST   | /api/register | Creates a `user` using 
the information sent inside the `body` of the 
request. **Hash the password** before saving the 
user to the database.  
                                                                                                                                                       |
| POST   | /api/login    | Use the credentials sent 
inside the `body` to authenticate the user. On 
successful login, create a new JWT with the user 
id as the subject and send it back to the client. 
If login fails, respond with the correct status 
code and the message: 'You shall not pass!' |


| GET    | /api/users    | If the user is logged in, 
respond with an array of all the users contained in 
the database. If the user is not logged in repond 
with the correct status code and the message: 'You 
shall not pass!'. Use this endpoint to verify that 
the password is hashed before it is saved.
*/

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("./database/dbConfig.js");

const server = express();

server.use(express.json());
server.use(cors());

const generateToken = user => {
  const payload = {
    subject: user.id,
    username: user.username,
    departments: ["Web dev", "back-end", "fashion", "cooking"]
  };

  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: "1m"
  };

  return jwt.sign(payload, secret, options);
};

server.post("/api/register", (req, res) => {
  // grab username and password from body
  const creds = req.body;

  // generate hash from user's password
  const hash = bcrypt.hashSync(creds.password, 4);

  // override the user.password with the hash
  creds.password = hash;

  //save the user to the database
  db("users")
    .insert(creds)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => json(err));
});

server.post("/api/login", (req, res) => {
  // grab username and password from body
  const creds = req.body;

  db("users")
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        // passwords match and user exists by that username
        // created a session > create a token
        // library sent cookie automatically > we send the token manually

        const token = generateToken(user);
        res.status(200).json({ message: "logged in!", token });
      } else {
        // either username is invalid or password is wrong
        res.status(401).json({ message: "you shall not pass!!" });
      }
    })
    .catch(err => res.json(err));
});

const protected = (req, res, next) => {
  // token is normally sent in the the Authorization header
  const token = req.headers.authorization;

  if (token) {
    // is it valid
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        // token is invalid
        res.status(401).json({ message: "invalid token" });
      } else {
        // token is good!
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    // bounced
    res.status(401).json({ message: "no token provided" });
  }
};

server.get("/api/users", protected, (req, res) => {
  db("users")
    .select("username", "password")
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

server.listen(6666, () => console.log("running on 6666"));
