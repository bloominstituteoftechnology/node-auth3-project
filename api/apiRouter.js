const users = require('./routes/users')

module.exports = (server) => {
    server.use('/api', users)
}
