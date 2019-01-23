const db = require("../dbConfig");

module.exports = {
  get: (id) => {
    id
    ? db("users").where("id", id).select("id", "username", "department")
    : db("users").select("id", "username", "department")
  },
  getByDepartment: (department) => {
    return db("users").where("department", department).select("id", "username", "department");
  },
  insert: user => {
    return db("users")
      .insert(user)
      .then(ids => ({ id: ids[0] }));
  }
};