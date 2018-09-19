const knex = require("knex");
const dbConfig = require("../../knexfile");

const db = knex(dbConfig.development);

module.exports = {
  register: function(creds) {
    let query = db("users");
    return query.insert(creds).then(user => {
      res.send(`show me something ${user}`);
    });
  },

  login: function(creds) {
    let query = db("users");
  }
};
