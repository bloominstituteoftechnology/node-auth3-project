const knex = require("knex");

const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

module.exports = {
  findUsers: () => {
    return db("users").select("id", "username", "department");
  },

  addUser: user => {
    return db("users").insert(user);
  },

  findUserByName: username => {
    return db("users").where("username", username).first();
  },

  findUserByID: id => {
    return db('users').where('id', id).first();
  }
};
