exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", users => {
    users.increments();

    users.string("username").notNullable();
    users.string("password").notNullable();
    users.string("department").notNullable();

    users
      .dateTime("created_at")
      .notNullable()
      .defaultTo(knex.raw("CURRENT_TIMESTAMP"));
  });
};

exports.down = function(knex, Promise) {
  return knex.dropTableIfExists("users");
};
