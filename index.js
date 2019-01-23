const express = require('express')
const cors = require('cors')
const bcrypt = require('bcryptjs')


const server = express();
const PORT = process.env.PORT || 4500;
const db = require('./data/helpers/dataHelper')

server.use(express.json())
// May add cors orgin to make sure it is allowed.

server.post('/api/register', (req, res) => {
    const user = req.body
    user.password = bcrypt.hashSync(user.password, 12)

    db.insert(user)
        .then(ids => {
            res.status(201).json({id: ids[0]})
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

                res.status(200).json({info: 'Login Successfull'})
            } else {
                res.status(404).json({err: 'Not a valid login'})
            }
        })
        .catch(err => {
            res.status(500).send(err)
        }
        )

})

server.get('/api/users', (req, res) => {
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