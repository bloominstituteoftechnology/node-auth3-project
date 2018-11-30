
exports.up = function(knex, Promise) {
  return knex.schema.createTable('departmentsUsers', table => {
    table.increments()
    table.integer('user_id')
      .unsigned()
      .references('id')
      .inTable('users')
    table.integer('department_id')
      .unsigned()
      .references('id')
      .inTable('departments')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('departmentsUsers');
};
