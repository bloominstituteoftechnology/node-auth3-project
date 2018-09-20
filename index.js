const express = require('express');
const helmet = require('helmet');
//const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = require('./database/dbConfig');

const server = express();


server.use(helmet());
server.use(express.json());
//server.use(cors({ origin: "http://localhost:3000" }));


const secret = "parts unknown";
//Generate token 
function genToken(user){
    const payload = {
        username: user.username,
        department: user.department
    };
    const secret = 'parts unknown'
    const options = {
        expiresIn: '1h',
        jwtid: '12345'
    }
    return jwt.sign(payload, secret, options);
}

//  Protected middleware
// function protected(req, res, next) {

//     next()
            //  }
function protected(req, res, next) {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, secret, (error, decodedToken) => {
            if (error) {
                return res
                    .status(400)
                    .json({ Message: ' Invalid token' })
            } else {
                req.user = { username: decodedToken.username, department: decodedToken.department }
            next()
            }
        })
    } else {
        return res.status(400).json({ Message: 'No token found' })
    }
}


server.get('/', (req, res) => {
    res.send('API running....')
});


// server.get('/api/users',protected, (req, res) => {
//     db('users')
//         .select('id', 'username', 'department')
//         .where({department: req.user.department})
//         .then(users => {
//             res.status(200).json(users)
//         })
//         .catch(error => {
//             res.status(500).json({Message: 'Can not get users!', error})
//         })
// })

server.get("/api/users", protected, (req, res) => {
    db("users")
      .select("username", "id", "department")
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        console.error(err);
      });
  });

server.post('/api/register', (req, res) => {
    const creds = req.body;
    const hash = bcrypt.hashSync(creds.password, 3);
    creds.password = hash;

    db('users')
    .insert(creds)
    .then(ids => {
      db('users')
        .where({ id: ids[0] })
        .first()
        .then(user => {
          const token = genToken(user);
          res.status(201).json({id: user.id,token});
        });
    })
    .catch(err => res.status(500).json({message: "Severe Error"}));
    // .catch(function(error) {
    //   res.status(500).json({ error });
    // });
})


server.post('/api/login', (req, res) => {
    const creds = req.body;

    db('users')
        .where({username: creds.username})
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(creds.password, user.password)) {
                const token = genToken(user);
                res.status(200).json({token})
            } 
            else {
                return res.status(400).json({Message: 'Wrong credentials'})
            }
        })
        .catch(error => {
            res.status(500).json(error)
        })
})



server.listen(3300 , () => console.log('\nrunning on port 3300\n'));