module.exports = {
  getAllUsers
};

const db = require("../db-config");

function getAllUsers() {
  return db("users");
}
