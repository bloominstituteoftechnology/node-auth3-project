//set requires
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("./helpers/dbHelpers");

//set port #
const PORT = 9000;

const server = express();
server.use(express.json(), cors());

//import secret for JWT
const secret = "secretsarenofununlessyoutelleveryone";

//restricts access based on login
function protect(req, res, next) {
   const token = req.headers.authorization;
   if(token){
      jwt.verify(token, secret, (err, decodedToken) => {
         if(err) {
            res.status(400).send("You shall not pass! Invalid Token")
         } else {
//not sure what this does need to ask about this tuesday**
            req.username = decodedToken.username
            next();
         }
      })
   } else {
      res.status(401).json({err: "token missing"});
   }
}

//generates jwt
function generateToken(user) {
   const payload = {
      jwtid: user.id,
      username: user.username
   }
   const options = {
      expiresIn: "1hr",
   }
   return jwt.sign(payload, secret, options)
}

server.get("/", (req, res) => {
   res.send("Homepage");
});

/*Creates a user using the information sent inside the body of the request. Hash the password before saving the user to the database.*/
server.post("/api/register", (req, res) => {
   const user = req.body;
   if (user.username && user.password) {
   user.password = bcrypt.hashSync(user.password, 14);
   db.insert(user)
      .then(ids => {
         const id = ids[0];
         db.findById(id)
            .then(user => {
               if(user){
                  const token = generateToken(user[0]);
                  res.status(201).json({id: ids[0], token});
               } else {
                  res.status(404).send("User not found");
               }
            })
      })
      .catch(err => {
         res.status(500).send(err);
      })
   } else  res.status(400).json({err: "please provide a username and password"});
});

/*Use the credentials sent inside the body to authenticate the user. On successful login, create a new JWT with the user id as the subject and send it back to the client. If login fails, respond with the correct status code and the message: 'You shall not pass!'*/
server.post("/api/login", (req, res) => {
   const login = req.body;
   if (login.username && login.password) {
      db.findByUsername(login.username)
         .then(users => {
            if(users.length && bcrypt.compareSync(login.password, users[0].password)) {
            const token = generateToken(users[0])
            res.send(`Welcome ${login.username}`);
             } else { res.status(404).send("You shall not pass!");}
         })
         .catch(err => {
            res.status(500).send(err);
         });
   } else  res.status(400).json({err: "please provide a username and password"});
});

/*If the user is logged in, respond with an array of all the users contained in the database. If the user is not logged in repond with the correct status code and the message: 'You shall not pass!'.*/
server.get("/api/users", protect, (req, res) => {
   db.findUsers()
      .then(users => {res.json(users)})
      .catch(err => {res.json(err)});
});

//allow incoming request to server
server.listen(PORT, () => {
   console.log(`server running on port ${PORT}`)
});