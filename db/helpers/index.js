const knex = require("knex");
const dbConfig = require("../../knexfile");

const db = knex(dbConfig.development);

module.exports = {
  register: function(creds) {
    let query = db("users");
    return  ( query
      .insert(creds)
      .select("id", "username", "department")
      .then(id => {
        id = ids[0];
        console.log("line 14 helper", id);
        query
          .where({ id })
          .first()
          .then(user => {
            console.log("line 19 helper", user);
            user;
          })
      }));
  },

  login: function(creds) {
    let query = db("users");
  }
};
