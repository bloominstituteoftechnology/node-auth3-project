exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", function(table) {
    table.increments();
    table
      .string("username", 255)
      .notNullable()
      .unique();
    table.string("password", 255).notNullable();
    table.string("department", 255);
  });
};
 
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};