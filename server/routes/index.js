const userRouter = require('./api/userRouter')
const restrictedRouter = require('./api/restrictedRouter')
const authRouter = require('./auth/authRouter')

module.exports = (server) => {
  server.use('/api/users', userRouter)
  server.use('/api/restricted', restrictedRouter)
  server.use('/api', authRouter)
}
