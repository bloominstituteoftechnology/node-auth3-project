require('dotenv').config()
const jwt = require('jsonwebtoken')


module.exports = {
  generateToken: (user) => {
    const payload = {
      username: user.username,
    };
    const secret = process.env.JWT_SECRET;
    const options = {
      expiresIn: '30m',
    }
    return jwt.sign(payload, secret, options)
  }
}


