const express = require('express')

const Users = require('./users-model.js')
//const authenticate = require('../auth/authenticate-middleware.js')
const restricted = require('../auth/restricted-middleware.js')

const router = express.Router()

router.get('/', restricted, async (req, res) => {
    const department = req.jwtToken.department
    console.log(department)
    try {
        const users = await Users.getUserByDepartment(department)
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({
            message: "There was an error retrieving the users."
        })
    }
})

module.exports = router