
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increment()
    table.string('username').notNullable().unique()
    .table('password').notNullable()
    .table('department').notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users')
};
