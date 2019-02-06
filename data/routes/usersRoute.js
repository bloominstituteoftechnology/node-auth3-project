require('dotenv').config()
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const db = require('../helpers/usersDb')

//endpoints

const protected = (req, res, next) => {
  const token = req.headers.authorization;
  if(token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res
          .status(401)
          .json({message: 'Invalid Token'})
      } else {
        req.decodedToken = decodedToken;
        next()
      }
    })
  } else {
    res
      .status(401)
      .json({message: 'No token Provided'})
  }
}

router.get('/', protected, (req, res) => {
  db.getUser()
    .then(users => {
      console.log(users)
      res
        .status(200)
        .json({users, decodedToken: req.decodedToken})
    })
    .catch(() => {
      res
        .status(500)
        .json({message: 'Failed to get users'})
    })
})

module.exports = router;