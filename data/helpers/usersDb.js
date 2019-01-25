const db = require("../dbConfig");

module.exports = {
  get: function(username) {
    let query = db("users");
    if (username) {
      query.where("username", username);
    }
    return query;
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
  delete: function(id) {
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
