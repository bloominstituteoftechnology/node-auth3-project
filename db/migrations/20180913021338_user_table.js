
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', table => {
    table.increments()
    table.string('username', 128).notNullable().unique()
    table.string('password', 128).notNullable()
    table.string('department', 128)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('user')
};
