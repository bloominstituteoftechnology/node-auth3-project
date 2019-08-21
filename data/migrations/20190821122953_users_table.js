
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments();
    table.string('username', 255).unique().notNullable();
    table.string('password', 255).notNullable();
    table.string('department', 128).notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
