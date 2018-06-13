const router = require('express').Router()

const User = require('./User')

router.route('/').get((req, res) => {
  User.find()
    .select('-password')
    .then(users => {
      res.json(users)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})
router.route('/').post((req, res) => {
  const { username, password, race } = req.body
  User.create({ username, password, race })
    .then(saveduser => res.status(200).json(saveduser))
    .catch(error => res.status(500).json({ error: error.message }))
})

module.exports = router
