require('dotenv').config();


const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//const cors = require('cors');

const knex = require('knex');
const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
//server.use(cors());

function generateToken(user) {
  const payload = {
    subject: user.userId,
    username: user.username
  };
  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: "1h",
  };
  return jwt.sign(payload, secret, options);
}
function protected(req, res, next) {
  const token = req.headers.authorization;
  if(token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if(err) {
        res.status(401).json({ message: 'incorrect token'})
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    } )
  } else {
    res.status(401).json({ message: 'no token provided'})
  }
};

server.get("/users",  protected, (req, res)=> {
      db("users")
      .then(creds => {
        res.json(creds);
      }
      );
});
  
  server.post("/api/register", (req, res) => {
    const credentials = req.body;
  
    const hash = bcrypt.hashSync(credentials.password, 14);
    credentials.password = hash;
  
    db("users")
      .insert(credentials)
      .then(ids => {
        const id = ids[0];
        res.status(201).json({ newUserId: id });
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });
  
  server.post("/api/login", (req, res) => {
    const creds = req.body;
  
    db("users")
      .where({ username: creds.username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(creds.password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({ welcome: creds.username, token });
        } else {
          res.status(401).json({ message: "you shall not pass!" });
        }
      })
      .catch(err => res.status(500).json({ err }));
  });
  

  
server.listen(9000, () => console.log("\n Port 9000 \n"));