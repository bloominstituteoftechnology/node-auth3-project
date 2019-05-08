const db = require("../../data/config");

module.exports = {
  getUsers
};

function getUsers(department) {
  return db("users")
    .select("id", "department", "username")
    .where({ department });
}
