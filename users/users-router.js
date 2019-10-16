const router = require('express').Router();
const Users = require('./users-router');

router.get('/' , (req,res) => {
 Users.find()
 .then(users => {
 res.json({ users, loggedInuser: req.user.username})
 })
 .catch(err => {
     res.send(err)
 })
})

module.exports = router;