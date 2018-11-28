const jwt = require('jsonwebtoken')

function generateToken(user){
    const payload = {
        userId     : user.id,
        username   : user.username,
        department : user.department,
    }
    const options = {
        expiresIn : '1h',
    }

    return jwt.sign(payload, process.env.JWT_SECRET, options)
}

module.exports = generateToken
