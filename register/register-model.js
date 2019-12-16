const db = require("../db-config.js");
const bcrypt = require("bcryptjs");
module.exports = {
  addUser
};

function addUser(user) {
  user.password = bcrypt.hashSync(user.password);
  return db("users").insert(user, "id");
}
