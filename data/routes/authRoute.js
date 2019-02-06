const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const db = require('../helpers/authDb')

// endpoints
router.post('resgister', (req, res) => {
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 12)
  creds.password = hash
  (creds.username && creds.password && creds.department) ? 
    db.register(creds)
      .then(id => {
        res
          .status(201)
          .json(id)
      })
      .catch(() => {
        res
          .status(500)
          .json({message: 'Failed to resister user'})
      }):
        res
          .status(404)
          .json({message: 'Missing username/password/department'})
})

router.post('login', (req, res) => {
  const creds = req.body
  (creds.username && creds.password) ? 
    db.login(creds)
    .then(user => {
      (user.password && bcrypt.compareSync (creds.password, user.password)) ?
        res
          .status(201)
          .json({message: 'welcome'}):
        res
          .status(403)
          .json({message: 'you shall not pass'})
    })
    .catch(() => {
      res
        .status(500)
        .json({message: 'Failed to login'})
    }):
      res
        .status(404)
        .json({message: 'Missing username/password'})

})

module.exports = router;