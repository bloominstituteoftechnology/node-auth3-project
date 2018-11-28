const jwt = require('jsonwebtoken')

function generateToken(user){
    const payload = {
        userId   : user.id,
        username : user.username,
        roles    : [
            'sales',
            'marketing',
        ],
    }
    const options = {
        expiresIn : '1h',
    }

    return jwt.sign(payload, process.env.JWT_SECRET, options)
}

module.exports = generateToken