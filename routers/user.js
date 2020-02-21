const router = require('express').Router();
const Users = require('../users/model');
const restricted = require('../middleware/restricted');
const department = require('../middleware/department');

// GET/ users
router.get("/users",restricted, department('Admin'), (req, res) => {
    Users.find().then(users => {
        res.json(users)
    }).catch(error => {
        res.send(error);
        console.log(error)
    })
})



module.exports = router;