exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", tbl => {
    tbl.increments();

    tbl.string("username");
    tbl.string("password");
    tbl.string("department");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExsists("users");
};
