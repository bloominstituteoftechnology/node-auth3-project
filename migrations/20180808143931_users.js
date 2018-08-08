exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", table => {
    // pk
    table.increments();
    // other fields
    // username, password and department
    table.string("user_name", 256).notNullable();
    table.string("password").notNullable();
    table.string("department").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
