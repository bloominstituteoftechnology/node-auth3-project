exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments();
    table
      .string('username', 128)
      .notNullable()
      .unique();
    table.text('password').notNullable();
    table.text('department').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
