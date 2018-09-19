
exports.up = function(knex, Promise) {
  return knex.schema.createTable('department', t => {
    t.increments();
    t
    .string('department', 30)
    .notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('department')
};
