exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", function(table) {
    // key
    table.increments();
    table.string("department", 255);

    table
      .string("username", 255)
      .notNullable()
      .unique();

    table.string("password", 255).notNullable();
  });
};

exports.down = function(knex, Promise) {
  // drop the users table
  return knex.schema.dropTableIfExists("users");
};
