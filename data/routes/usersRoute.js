const express = require('express')
const router = express.Router()

const db = require('../helpers/usersDb')

//endpoints

router.get('/', (req, res) => {
  db.getUser()
    .then(users => {
      res
        .status(200)
        .json(users)
    })
    .catch(() => {
      res
        .status(500)
        .json({message: 'Failed to get users'})
    })
})

module.exports = router;