const db = require("../database/dbConfig");

const find = () => {
  return db("users");
};

const findById = id => {
  return db("users").where({ id });
};

const findBy = filter => {
  return db("users").where(filter);
};

const add = user => {
  return db("users").insert(user);
};

module.exports = { add, find, findBy, findById };
