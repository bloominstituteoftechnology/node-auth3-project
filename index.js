const express = require('express'); 
const helmet = require('helmet');
const knexConfig = require('./knexfile');
const knex = require('knex');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const jwt = require('jsonwebtoken');

require('dotenv').config(); 

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
    const secret = process.env.JWT_SECRET;
    const options = {
        expiresIn: '1m',
    };
        return jwt.sign(payload, secret, options);
}

// SANITY CHECK
server.get('/', (request, response) => {
    response.send("Let's GO!")
});

server.listen(8888, () => console.log('\nrunning on port 8888\n'));