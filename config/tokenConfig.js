require('dotenv').config();

const jwt = require('jsonwebtoken')

module.exports = user =>{
    const payload = {
        ...user
    }
    const secret = process.env.JWT_SECRET
    const options = {
        expiresIn: '10m'
    }
    return jwt.sign(payload,secret,options)
}