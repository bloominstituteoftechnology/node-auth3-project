exports.up = function(knex, Promise) {
  return knex.schema.createTable('departments', table => {
    table.increments();
    table
      .string('name', 128)
      .notNullable()
      .unique();
    table
      .integer('access_level')
      .unsigned()
      .notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('departments');
};
