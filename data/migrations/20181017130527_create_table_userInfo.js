
exports.up = function(knex, Promise) {
  return knex.schema.createTable('userInfo', table => {
      table.increments()
      table.string('username').unique('username').notNullable()
      table.string('password').notNullable()
      table.string('department').notNullable()

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('userInfo')
};
