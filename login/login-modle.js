const db = require("../db-config");

module.exports = {
  findUser
};

function findUser(user) {
  return db("users")
    .where({ username: user.username })
    .first();
}
