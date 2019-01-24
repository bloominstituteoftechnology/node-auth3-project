const db = require("../dbConfig");

module.exports = {
  get: username => {
    if (username) {
      return db("users").where("username", username).select("id", "username", "department");
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
  },
  remove: function(id) {
    if(id) {
      return db("users")
      .where("id", id)
      .del();
    } else {
      return db('users')
      .del();
    }
    
  }
};
