exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", users => {
    users.increments();
    users
      .string("username", 255)
      .notNullable()
      .unique();
    users.string("password", 255).notNullable();
    users.string("department", 255);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
