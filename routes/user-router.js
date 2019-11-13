const router = require('express').Router();
const restricted  = require('../middleware/restricted.js')
const Users = require('../models/user-model.js')
router.get('/', restricted, (req,res) => {
    Users.get()
        .then(allUsers => {
            res.status(200).json(allUsers)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({message: `error retrieving users`})
        })
})






module.exports = router;