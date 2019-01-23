const knex = require("knex");
const db = require("./users.sqlite3");

module.exports = {
  findUsers: () => {
    return db("users").select("id", "username");
  },

  addUser: user => {
    return db("users").insert(user);
  },

  findUserByName: username => {
    return db("users").where("username", username);
  }
};
