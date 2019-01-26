const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./database/dbHelpers');
const {protect} = require('./database/middleware')

const server = express();

server.use(express.json());
server.use(cors())
const PORT = 3300;


tokenGenerator = (user) => {
    const payload = {
        user: user.username,
    }

    const secret = "shh don\'t tell noOne";

    const options = {
        expiresIn: '1h',
    }

    return jwt.sign(payload, secret, options);
}




// registration end point inserts username and password to table
server.post('/api/register', (req, res) => {
    const user = req.body;
    user.password = bcrypt.hashSync(user.password)
    const token = tokenGenerator(user.username)
    console.log(user)
    db.insert(user)
    .then(ids => {
        res.status(201).json({id: ids[0], user, token})
    })
    .catch(err => {
        res.status(500).send(err);
    })
})

server.post('/api/login', (req, res) => {
    const user = req.body;
    console.log(user)
    db.findUserById(user.username)
        .then(users => {
            if (user.password && bcrypt.compareSync(user.password, users[0].password, 10)) {
                const userId = tokenGenerator(user.username);
                res.json({ creds: 'correct', userId })
            } else {
                res.status(404).json({message: 'Username or Password incorrect'})
          }
            
        })
    })
    


server.post('/api/login', (req, res) => {
    const user = req.body;
    db.findByUserId(user.username)
    .then(users => {
        //username validation, client password validation from db
        if(user && bcrypt.compareSync(user.password, users[0].password, 10)) {
            const token = tokenGenerator(user)
                res.json({ info: "Logged in", token})
        }
        else {
          res.status(404).json({message: "You shall not pass!"})
        }
      })
   

})

server.get('/api/users', protect,  (req, res) => {
    db.getUsers("users")
        .select("id", "username")
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.send(err)
        })
})

























server.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`)
});