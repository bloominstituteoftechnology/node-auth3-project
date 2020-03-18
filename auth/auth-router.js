const express = require("express")
const bcrypt = require("bcryptjs")
const users = require("../users/users-model")
const jwt = require("jsonwebtoken")

const router = express.Router()

router.post("/register", async (req, res, next) => {
    try {
        const { username } = req.body
        const user = await users.findBy({ username }).first()

        if(user) {
            return res.status(409).json({ message: "Username is already taken" })
        }
        res.status(201).json(await users.add(req.body))
    } catch(err) {
        next(err)
    }
})

router.post("/login", async (req, res, next) => {
    const authError = {
        message: "You shall not pass!"
    }
    try {
        const { username, password } = req.body
        const user = await users.findBy({ username }).first()
        if(!user) {
            return res.status(401).json(authError)
        }
        const passwordValid = await bcrypt.compare(password, user.password)
        if(!passwordValid) {
            return res.status(401).json(authError)
        }
        const payload = {
            userId: user.id,
        }
        const token = jwt.sign(payload, "hello there")
        res.cookie("token", token)
        res.json({
            message: `Welcome ${user.username}`,
            token: token
        })
    } catch(err) {
        next(err)
    }
})

module.exports = router;