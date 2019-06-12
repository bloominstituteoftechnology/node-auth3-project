const router = require('express').Router()

const User = require('./user-model')
const restricted = require('../auth/restricted')
const checkRole = require('../auth/checkRole')

router.get('/', restricted, checkRole('student'), (req, res) => {
    User.find()
    .then(user => {
        res.json(user)
    })
    .catch(err => res.send(err))
})

module.exports = router;