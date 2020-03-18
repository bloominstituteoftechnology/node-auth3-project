const data = require("../data/config");
const bcrypt = require("bcryptjs");

async function createUser(user) {
  user.password = await bcrypt.hashSync(user.password, 8);
  return data.insert(user).into("accounts");
}

function findByName(name) {
  return data("accounts")
    .select("id", "name", "password", "department")
    .where("name", name)
    .first();
}

module.exports = { createUser, findByName };
