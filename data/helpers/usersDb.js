const db = require("../dbConfig");

module.exports = {
  get: username => {
    if (username) {
      return db("users").where("username", username);
    }
    return db("users").select("id", "username", "department");
  },
  getByDepartment: department => {
    return db("users")
      .where("department", department)
      .select("id", "username", "department");
  },
  insert: user => {
    return db("users")
      .insert(user)
      .then(ids => ({ id: ids[0] }));
  }
};
