const bcrypt = require("bcryptjs");

const db = require("../../data/config");

module.exports = {
  addUser
};

function addUser(user) {
  user.password = bcrypt.hashSync(user.password, 8);

  return db("users").insert(user);
}
