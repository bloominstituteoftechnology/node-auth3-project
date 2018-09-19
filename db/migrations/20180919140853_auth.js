
exports.up = function(knex, Promise) {
  return knex.schema.createTable('auth', t => {
    t.increments()
    t
    .string('username', 16)
    .notNullable()
    .unique();
    t
    .string('password', 24)
    .notNullable();
    t
    .integer('department_id')
    .notNullable()
    .references('id')
    .inTable('department');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('auth')
};
