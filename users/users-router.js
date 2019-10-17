const router = require('express').Router();
const Users = require('./user-model');

router.get('/', (req,res) => {
 Users.find()
 .then(users => {
 res.json({ users, loggedInuser: req.user.username})
 })
 .catch(err => {
     res.send(err)
 })
})

module.exports = router;