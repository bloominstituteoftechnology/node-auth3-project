const session = require('express-session');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');

const server = express();
const db = require('./data/db');

server.use(express.json());
const PORT = 3400
const secret = 'Hello';



server.use(
    
        session({
            name: 'itmenick',
            secret: secret,
            cookie: {maxAge: 1 * 24 * 60 * 60 * 1000,
                secure: false},
            httpOnly: true, 
            
            resave: false,
            saveUnitialized: true,
        })
    );

    function generateToken(user) {
        const payload = {
            username: user.username
        };
        const options = {
            expiresIn: "24h",
            jwtid: "BADA55"
        };
        return jwt.sign(payload, secret, options);
    }

    function protected(req, res, next) {
        const token = req.headers.authorization;
        if (token) {
          jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
              return res.status(401).json({ message: "you shall not pass!" });
            }
            req.jwtToken = decodedToken;
            next();
          });
        } else {
          return res.status(401).json({ message: "you shall not pass!" });
        }
      }


      server.get("/", (req, res) => res.send("Hello World!"));

server.get('/users', protected, (req, res) => {
    console.log('token', req.jwtToken);

    db('users')
    .then(users => {
        res.json(users);
    })
    .catch(err => res.send(err));
    })

    server.post("/register", function(req, res) {
        const user = req.body;
      
        
        const hash = bcrypt.hashSync(user.password, 14);
        user.password = hash;
      
        db("users")
          .insert(user)
          .then(function(ids) {
            db("users")
              .where({ id: ids[0] })
              .first()
              .then(user => {
                
                const token = generateToken(user);
      
                
                res.status(201).json(token);
              });
          })
          .catch(function(error) {
            res.status(500).json({ error });
          });
      });
      

server.post('/login', function(req,res) {
    const credentials = req.body;

    db('users')
    .where({username: credentials.username})
    .first()
    .then(function(user) {
        if (user && bcrypt.compareSync(credentials.password, user.password) ) {

            const token = generateToken(user);

            res.send(token);

        } else {
            return res.status(401).json({error: 'You shall not pass!'});
        }
    })
    .catch(function(error) {
        res.status(500).json({error});
    })
})





server.listen(PORT, () => {
    console.log(`Server up and running on ${PORT} m8`)
})