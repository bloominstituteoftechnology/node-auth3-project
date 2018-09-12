const express = require("express"); 
const cors = require("cors"); 
const bcrypt = require("bcrypt"); 
const jwt = require("jsonwebtoken"); 
const session = require('express-session'); 

const KnexSessionStore = require('connect-session-knex')(session); 

const db = require('./database/dbConfig'); 

const server = express(); 

server.use(express.json()); 
server.use(cors()); 

const secret = "one two three"; 

function generateToken(user){
    const payload={
        username: user.username, 
    };
    const options = {
        expiresIn: "1hr",
        jwtid: "12345", 
    }; 
    return kwt.sign(payload, secret, options); 
}
server.post('/api/register', (req, res)=>{
    const creds = req.body;
    const hash = bcrypt.hashSync(creds.password, 10); 
    creds.password = hash; 
    db('users')
        .insert(creds)
        .then(user => {
                const token = generateToken(user);
                res.status(201).json({id:user.id, token}); 
        })
})

server.get("/", (req, res)=>{
    res.send("welcome"); 
}); 

server.listen(3300, () => console.log("\n Server 3300 is running \n"))