const express = require('express')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const server = express();
const PORT = process.env.PORT || 4500;
const db = require('./data/helpers/dataHelper')

server.use(express.json())
server.use(cors())

// secret server
const secret ="Thisoldmanplayednicknackpaddywackgiveadogabone_0.1"
// May add cors orgin to make sure it is allowed.
function generateToken(user) {


    const payload = {
        username: user.username,
        department: user.department
    }
    const options = {
        expiresIn: '1hr',
        jwtid: "165468Nlendfj" // jti
    }
    return (token = jwt.sign(payload, secret, options))
}

function protected(req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                //token will be invalid
                res.status(401).json({message: "Invalid Token"})
            } else {
                req.username = decodedToken.username
                next();
            }
        })

    } else {
        res.status(401).json({ message: 'no token provided' })
    }
}

server.post('/api/register', (req, res) => {
    const user = req.body
    user.password = bcrypt.hashSync(user.password, 12)

    db.insert(user)
        .then(ids => {
            const id = ids[0]
            db.getUserById(id)
                .then(user => {
                    const token = generateToken(user);
                    res.status(201).json({id: user.id, token})
                })
                .catch(err => {
                    res.status(404).send(err)
                })
        })
        .catch(err => {
            res.status(500).send(err)
        }
        )

})

server.post('/api/login', (req, res) => {
    const creds = req.body

    db.findByUser(creds.username)
        .then(user => {
            if (user && bcrypt.compareSync(creds.password, user.password)) {
                const token = generateToken(user);
                res.status(201).json({info: 'Login Successfull', token})
            } else {
                res.status(404).json({err: 'Not a valid login'})
            }
        })
        .catch(err => {
            res.status(500).send(err)
        }
        )

})

server.get('/api/users',protected, (req, res) => {
    db.getUser()
        .then(users => {
            res.status(201).json(users)
        })
        .catch(err => {
            res.status(500).send(err)
        })
})


server.listen(PORT, () => {
    console.log(`\n === JWT AUTH-II Listening on:${PORT} === \n`)
})