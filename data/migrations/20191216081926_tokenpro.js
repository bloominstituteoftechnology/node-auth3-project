exports.up = function(knex) {
  return knex.schema.createTable("users", tbl => {
    tbl.increments();
    tbl
      .string("username", 100)
      .notNullable()
      .unique();
    tbl.string("password", 100).notNullable();
  });
};

exports.down = function(knex) {
  knex.scema.dropTableIfExists("users");
};
