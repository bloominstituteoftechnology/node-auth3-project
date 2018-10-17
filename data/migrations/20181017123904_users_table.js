exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", tbl => {
    // id
    tbl.increments();
    tbl.string("users").notNullable();
    tbl.string("password").notNullable();
    tbl.string("department").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
