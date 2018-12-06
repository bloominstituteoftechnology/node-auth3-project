const express = require('express'); 
const helmet = require('helmet');
const knexConfig = require('./knexfile');
const knex = require('knex');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const jwt = require('jsonwebtoken');

// require('dotenv').config(); 

const server = express();

//Initialize db
const db = knex(knexConfig.development);

//Connect Middleware to Server 
server.use(helmet(), express.json());

erver.use(cors());

function generateToken(user) {
    const payload = {
      subject: user.id,
      username: user.username,
      department: user.department,
    };
    const secret = 'holla natalia. Claro que si corazon. Ya voy.';
    const options = {
        expiresIn: '1m',
    };
        return jwt.sign(payload, secret, options);
}

function protected(req, res, next) {
    const token = req.headers.authorization; //affixed to the header as Authorization

    // valid token exsists
    if (token) {
      jwt.verify(token, jwtSecret, (err, decodedToken) => {
        // invalid token
        if (err) {
          res.status(401).json({ message: 'invalid token' });
        } else {
          req.decodedToken = decodedToken;
          next();
        }
      });
    } else {
      // nonexsistent token
      res.status(401).json({ message: 'not token provided' });
    }
  }


// SANITY CHECK
server.get('/', (request, response) => {
    response.send("Let's GO!")
});

server.listen(8888, () => console.log('\nrunning on port 8888\n'));