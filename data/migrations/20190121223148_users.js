
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments();
    table.string('user').notNullable().unique();
    table.text('pass').notNullable();
    table.string('dept').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
