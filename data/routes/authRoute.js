require('dotenv').config()
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')


const db = require('../helpers/authDb')
const userDb = require('../helpers/usersDb')
const middleware = require('../middleware/middleware')


// endpoints
router.post('/register', (req, res) => {
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 12)
  creds.password = hash;
  if(creds.username && creds.password && creds.department) { 
    db.register(creds)
      .then(ids => {
        const id = ids[0]
        userDb.getUser(id)
          .then(user => {
            const token = middleware.generateToken(user)
            res
              .status(201)
              .json({token})
          })
          .catch(err => {
            res
              .status(500)
              .json('Failed to authenticate user')
          })
      })
      .catch((err) => {
        console.log(err)
        res
          .status(500)
          .json({message: 'Failed to resister user'})
      })
    } else {
        res
          .status(404)
          .json({message: 'Missing username/password/department'})
    }
})

router.post('/login', (req, res) => {
  const creds = req.body;
  if(creds.username && creds.password) {
    db.login(creds.username)
    .then(user => {
      if(user.password && bcrypt.compareSync (creds.password, user.password)) {
        const token = middleware.generateToken(user)
        res
          .status(200)
          .json({token})
      } else {
        res
          .status(403)
          .json({message: 'failed to authenticate'})
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({message: 'Failed to login'})
    })
  } else {
    res
        .status(404)
        .json({message: 'Missing username/password'})
  }     
})

module.exports = router;