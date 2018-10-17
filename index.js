const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./db/dbConfig.js');

const server = express();

server.use(express.json());
server.use(cors());



generateToken=(user)=>{
    const jwtPayload={
        username:user.username
    }
    
    const jwtSecret= 'It is a party'

    const jwtOptions={
        expiresIn:'1h',
        
    }
    return jwt.sign(jwtPayload,jwtSecret,jwtOptions);
}

server.get('/', (req, res) => {
  res.send('Its Alive!');
});

server.listen(6000, () => console.log('\nrunning on port 6000\n'));