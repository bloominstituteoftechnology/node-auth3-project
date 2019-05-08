const db = require("../../data/config");

module.exports = {
  findUser
};

async function findUser(username) {
  return db("users")
    .where({ username })
    .first();
}
