const express = require("express");
const knex = require("knex");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const dbConfig = require("./knexfile");
const cors = require('cors'); 

const server = express();
const db = knex(dbConfig.development);
server.use(express.json());
server.use(cors()); 

const secret = 'secretkey'; 

function generateToken(username){
    const payload = {
        username, 
    }
    const options = {
        expiresIn: "3hr", 
        jwtid: "134786"
    }; 

    return jwt.sign(payload, secret, options); 
}; 

function protected(req, res, next){
    const token  = req.headers.authorization; 
    if(token){
        jwt.verify(token, secret, (err, decodedToken) => {
            if(err){
                res.status(401).json({message: "Invalid Token"})
            } else {
                req.user = {username: decodedToken.username}; 
                next();
            }
        })
    }else{
        res.status(401).json({message: "No token provided!"}); 
    }
}


server.post("/api/register", (req, res) => {
  const creds = req.body;

  //Joi validation of request body
  const schema = {
    username: Joi.string()
      .min(8)
      .required(),
    password: Joi.string()
      .min(8)
      .required(),
    department: Joi.string().required()
  };
  const result = Joi.validate(creds, schema);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
  }

  const hash = bcrypt.hashSync(creds.password, 10);
  creds.password = hash;
  db("users")
    .insert(creds)
    .then(id => {
      const token = generateToken(creds.username); 
      res.status(201).json({id, token});
    })
    .catch(err => {
      res.status(500).json({ error: "Error updating data in the database" });
    });
});

server.get("/api/users", protected,  (req, res) => {
    if(req.user){
        db("users").then(users => {
            res.status(200).json(users); 
        }).catch(err => {
            res.status(500).json(err); 
        })
    }else {
        res.status(401).json({message:"Denied access!"})
    }
 
});

server.post("/api/login", (req, res) => {
    const creds = req.body; 
    db('users').where({username: creds.username}).first().then(user =>{
        if(user && bcrypt.compareSync(creds.password, user.password)){
            const token = generateToken(creds.username); 
            res.status(200).json({message: "Welcome! You are successfully logged in!", token}); 
        }else {
            res.status(401).json({message: "Sorry, your credentials are wrong, please try again"})
        }
    }).catch(err => {
        res.status(500).json(err); 
    })
})

server.listen(4400, () => {
  console.log("Server is listening on PORT 4400");
});
