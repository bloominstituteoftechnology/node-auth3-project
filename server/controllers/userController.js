const db = require('../data/db')

module.exports = {
  getUsers: (req, res, next) => {
    db('users')
      .select('username', 'id', 'department')
      .then(users => {
        res.status(200).json(users)
      })
      .catch(err => console.log(err))
  }
}
