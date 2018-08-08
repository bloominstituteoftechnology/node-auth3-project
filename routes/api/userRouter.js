const router = require('express').Router()
const { getUsers } = require('../../controllers/userController')
const jwt = require('jsonwebtoken')
//* Local Middleware
// const validateUser = (req, res, next) => {
//   console.log('USER', req.session)
//   if (!req.session.username) {
//     return res.status(401).json('user must login to access resource')
//   }
//   next()
// }

function validate(req, res, next) {
  const token = req.headers.authorization
  console.log(token, req.headers)
  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'you  shall not pass!! - token invalid' })
      }
      req.payload = decoded
    })
    next()
  } else {
    return res.status(401).json({ error: 'you shall not pass!! - no token' })
  }
}

router.get('/', validate, getUsers)

module.exports = router
